import { CanceledError } from "axios";
import { useEffect, useState } from "react"
import apiClient from "../services/apiClient";

// T is a generic type in TypeScript
interface FetchResponse <T>{
    count: number;
    results: T[];
}

// useData is a custom hook that is used to fetch api and using generic type so that we can reuse it accross the component
const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // It allows us to cancel or abort the request or any requests that take a long time to complete
        const controller = new AbortController()
        
        setIsLoading(true)
        apiClient.get<FetchResponse<T>>(endpoint, {signal: controller.signal})
        .then(res => {
            setData(res.data.results); 
            setIsLoading(false)})
            .catch((err) => {
                if (err instanceof CanceledError) return
                setError(err.message)
                setIsLoading(false)
            })
            
            // This is the clean up function to cancel the request
            return () => controller.abort()
        }, [])
        
    return {data, error, isLoading}
}

export default useData