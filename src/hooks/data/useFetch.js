import { useState, useEffect, useCallback } from "react";

export const useFetcher = (Funs = [], user_id = false, token = false) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [is_array, setIsArray] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const results = await Promise.all(Funs.map((fun) => fun()));
            const allSuccess = results.every((res) => res.success);
            if (allSuccess) {
                const combinedData = results.reduce((acc, key, i) => {
                    acc[`res_${i}`] = results[i];
                    return acc;
                }, {});

                setData(combinedData);
                setError(null);
                setMessage(null);
                setSuccess(true);
                setIsArray(Array.isArray(combinedData));
            } else {
                const firstError = results.find((res) => !res.success);
                setError(firstError.error || "An error occurred");
                setMessage(firstError.message || null);
                setSuccess(false);
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
            setMessage(null);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }, [Funs]);

    useEffect(() => {
        if (!user_id || !token) {
            setError("User ID and token are required");
            setMessage(null);
            setLoading(false);
            setSuccess(false);
            return;
        }

        if (Funs.length > 0) {
            fetchData();
        } else {
            setLoading(false);
            setSuccess(false);
        }
    }, [Funs, fetchData, user_id, token]);

    return { success, data, loading, error, message, is_array };
};