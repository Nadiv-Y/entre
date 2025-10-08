import { useEffect, useMemo, useState } from "react";
import axios from 'axios'

export const useFetch = ({url}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if(!url) return
        console.log("Fetching:", url, "at", new Date().toLocaleTimeString());
        const controller = new AbortController()
        const fetchData = async () => {
            try {
                const res = await axios.get(url)
                setData(res.data)
            } catch (error) {
                if (axios.isCancel(error)) return
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [url])

    return useMemo(() => ({data, error, loading}), [data, error, loading])
}

