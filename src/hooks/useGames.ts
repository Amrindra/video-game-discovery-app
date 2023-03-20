import { useEffect, useState } from "react"
import apiClient from "../services/apiClient"
import {CanceledError} from "axios"

interface Game {
    id: number,
    name: string
}

interface FetchGamesResponse {
    count: number,
    results: Game[]
}

const useGame = ()=>{
    const [games, setGames] = useState<Game[]>([])
    const [error, setError] = useState('')


    useEffect(() => {
        // It allows us to cancel or abort the request or any requests that take a long time to complete
        const controller = new AbortController()

        //Giving the generic type argument "<FetchGamesResponse>" so that we know the shape of the response object
        apiClient.get<FetchGamesResponse>("/games", {signal: controller.signal})
            .then(res => setGames(res.data.results))
            .catch((err) => {
                if (err instanceof CanceledError) return
                setError(err.message)})

        // This is the cleanr up function to cancel the request
        return () => controller.abort()
    }, [])

    return {games, error}
}

export default useGame