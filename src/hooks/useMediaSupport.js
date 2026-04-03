"use client";
import AStore from "@/actions/a.store";
import { Context } from "@/components/state/store-provider";
import { useCallback, useContext, useState } from "react";

export const useMediaSupport = ({ call }) => {
    const { dispatch } = useContext(Context);
    const [error, setError] = useState(null);

    const isMediaSupported = () =>
        typeof navigator !== "undefined" &&
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function";

    const stopStream = stream => {
        stream.getTracks().forEach(track => track.stop());
    };

    const requestMediaAccess = async ({ audio = true, video = true }) => {
        const constraints = {};
        if (audio) constraints.audio = true;
        if (video) constraints.video = true;

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            stopStream(stream);
            return { granted: true, constraints };
        } catch (error) {
            return { granted: false, error, constraints };
        }
    };

    const ensureMediaAccess = async ({ audio = true, video = true } = {}) => {
        const access = await requestMediaAccess({ audio, video });

        return {
            cameraAllowed: video ? access.granted : true,
            micAllowed: audio ? access.granted : true,
            mediaAllowed: access.granted,
            accessError: access.error,
            requestedConstraints: access.constraints,
        };
    };

    const acceptCall = useCallback(
        async ({ audio = true, video = true } = {}, onAccepted) => {
            dispatch({ type: AStore.loading, payload: true });
            setError(null);

            if (!isMediaSupported()) {
                setError("Your browser does not support media devices required for calls.");
                dispatch({ type: AStore.loading, payload: false });
                return;
            }

            try {
                const { cameraAllowed, micAllowed, mediaAllowed, accessError, requestedConstraints } = await ensureMediaAccess({ audio, video });

                if (!cameraAllowed || !micAllowed) {
                    const missing = [];
                    if (!cameraAllowed) missing.push("camera");
                    if (!micAllowed) missing.push("microphone");
                    setError(`Please allow ${missing.join(" and ")} access to proceed.`);
                    return;
                }

                if (!mediaAllowed) {
                    const requested = [];
                    if (requestedConstraints?.audio) requested.push("microphone");
                    if (requestedConstraints?.video) requested.push("camera");
                    const reason = accessError?.message || "Permission denied or device capture unavailable.";
                    setError(`Unable to access ${requested.join(" and ")}: ${reason}`);
                    return;
                }

                await call.AcceptCall();
                onAccepted && onAccepted();
            } catch {
                setError("Failed to accept the call.");
            } finally {
                dispatch({ type: AStore.loading, payload: false });
            }
        },
        [call, dispatch, setError]
    );

    return { acceptCall, error };
};