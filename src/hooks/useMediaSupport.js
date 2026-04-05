"use client";
import AStore from "@/actions/a.store";
import { Context } from "@/store/store-provider";
import { useCallback, useContext, useState } from "react";

export const useMediaSupport = ({ call }) => {
    const { dispatch } = useContext(Context);
    const [error, setError] = useState(null);


    const isMediaSupported = () =>
        typeof navigator !== "undefined" &&
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia;

    const stopStream = stream => {
        stream.getTracks().forEach(track => track.stop());
    };

    const requestMediaAccess = async ({ audio = true, video = true }) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio, video });
            stopStream(stream);
            return true;
        } catch {
            return false;
        }
    };

    const hasPermission = async (name, constraints) => {
        // Safari fallback (no permissions API)
        if (!navigator.permissions?.query) {
            return requestMediaAccess(constraints);
        }

        try {
            const { state } = await navigator.permissions.query({ name });

            if (state === "granted") return true;
            if (state === "denied") return false;

            // "prompt"
            return requestMediaAccess(constraints);
        } catch {
            return requestMediaAccess(constraints);
        }
    };

    const acceptCall = useCallback(
        async ({ audio = true, video = true } = {}, onAccepted) => {
            dispatch({ type: AStore.loading, payload: true });

            if (!isMediaSupported()) {
                setError("Your browser does not support media devices required for calls.");
                dispatch({ type: AStore.loading, payload: false });
                return;
            }

            try {
                const micAllowed = audio ? await hasPermission("microphone", { audio: true, video: false }) : true;
                const camAllowed = video ? await hasPermission("camera", { audio: false, video: true }) : true;
                if (!micAllowed || !camAllowed) {
                    setError("Camera or microphone not allowed, please provide permissions to proceed.");
                    return;
                };
                call.AcceptCall().then(() => { onAccepted && onAccepted(); }).catch(() => { setError("Failed to accept the call.") });
            } finally {
                dispatch({ type: AStore.loading, payload: false });
            }
        },
        [call, dispatch, setError]
    );
    return { acceptCall, error };
};
