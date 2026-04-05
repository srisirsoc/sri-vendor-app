import { useEffect, useState, useCallback, useContext } from "react";
import { GetId, GetSession } from "../../library/session-hub";
import { Context } from "../../store/store-provider";

export const useAuth = ({ data } = {}) => {
    const { state } = useContext(Context);
    const [auth, setAuth] = useState({
        user: {},
        token: null,
        user_id: null,
        error: null,
        message: null,
    });

    const init = useCallback(async () => {
        try {
            if (!auth.token || !auth.user_id) {
                const [token, user_id] = await Promise.all([GetSession(), GetId()]);
                setAuth((prev) => ({ ...prev, token, user_id, ...state }));
            }
        } catch (err) {
            setAuth((prev) => ({ ...prev, error: err.message || "Auth initialization failed" }));
        }
    }, [auth.token, auth.user_id]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if (data) { setAuth((prev) => ({ ...prev, ...data })) }
    }, [data]);

    return { auth, setAuth };
};