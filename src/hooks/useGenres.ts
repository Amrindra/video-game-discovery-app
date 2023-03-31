import { CanceledError } from "axios";
import { useEffect, useState } from "react"
import apiClient from "../services/apiClient";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenreResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        // It allows us to cancel or abort the request or any requests that take a long time to complete
        const controller = new AbortController()

        setIsLoading(true)
        apiClient.get<FetchGenreResponse>("/genres", {signal: controller.signal})
            .then(res => {
                setGenres(res.data.results); 
                setIsLoading(false)})
            .catch((err) => {
                if (err instanceof CanceledError) return
                setError(err.message)
                setIsLoading(false)
            })

        // This is the cleanr up function to cancel the request
        return () => controller.abort()
    }, [])

    return {genres, error, isLoading}
}

export default useGenres