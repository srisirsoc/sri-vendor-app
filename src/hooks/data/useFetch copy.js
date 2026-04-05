// hooks/data/useFetch.js
import { useState, useEffect, useCallback } from "react";

export const useFetch = (fnMap = {}, deps = [], options = {}) => {
    const { immediate = true } = options;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const validateResponse = (res) => {
        if (!res || !res.success) {
            throw new Error(res?.error || res?.message || "Something went wrong");
        }
        return res.data ?? {};
    };

    const execute = useCallback(async () => {
        const keys = Object.keys(fnMap);
        if (!keys.length) return {};

        setLoading(true);
        setError(null);

        try {
            const results = await Promise.all(
                keys.map((key) => fnMap[key]().then(validateResponse))
            );

            const mappedData = keys.reduce((acc, key, i) => {
                acc[key] = results[i];
                return acc;
            }, {});

            setData(mappedData);
            return mappedData;
        } catch (err) {
            console.error("useFetch error:", err);
            setError(err?.message || "Unexpected error occurred");
            setData({});
            return {};
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        if (immediate) execute();
    }, [execute, immediate]);

    return { data, loading, error, refetch: execute };
};