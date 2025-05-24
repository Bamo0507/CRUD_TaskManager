import { useState, useEffect } from "react";
import api from "@services/api";

export function useFetch(endpoint, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = async () => {
        setLoading(true);
        try {
            const res = await api.get(endpoint, options);
            setData(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [endpoint]);

    return { data, loading, error, refetch };
}