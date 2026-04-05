import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "@/store/store-provider";

export const useSignaling = ({ payload, call, socket, onEnd }) => {
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !payload?.room_id) return;

        const handleCallAccepted = async (data) => {
            dispatch({ type: 'model', payload: [false, null] });
            navigate(`/calls/${data?.service_id}`, { replace: true });
        };

        const handleCallOffer = async ({ offer }) => {
            if (offer && call) await call.handleOffer(offer);
        };

        const handleCallAnswer = async ({ answer }) => {
            if (answer && call) await call.handleAnswer(answer);
        };

        const handleCallIce = async ({ candidate }) => {
            if (candidate && call) await call.handleIceCandidate(candidate);
        };

        const handleCallRejected = () => {
            toast.error("Call rejected");
            call.endCall();
            onEnd?.();
        };

        const handleCallEnded = () => {
            toast.success("Call ended");
            onEnd?.();
        };

        const handleCallTimeout = () => {
            toast.error("Maximum duration is finished!");
            call.endCall();
            onEnd?.();
        };

        const CallNotPick = () => {
            toast.error("Call not picked up by callee");
            call.endCall();
            onEnd?.();
        };

        socket.emit("register-socket", { user_id: payload?.user_id });
        socket.emit("join-room", payload);

        socket.on("call-accepted", handleCallAccepted);
        socket.on("call-offer", handleCallOffer);
        socket.on("call-answer", handleCallAnswer);
        socket.on("call-ice", handleCallIce);
        socket.on("call-rejected", handleCallRejected);
        socket.on("call-ended", handleCallEnded);
        socket.on("call-time-out", handleCallTimeout);
        socket.on("call-not-pickup", CallNotPick);

        return () => {
            socket.off("call-accepted", handleCallAccepted);
            socket.off("call-offer", handleCallOffer);
            socket.off("call-answer", handleCallAnswer);
            socket.off("call-ice", handleCallIce);
            socket.off("call-rejected", handleCallRejected);
            socket.off("call-ended", handleCallEnded);
            socket.off("call-time-out", handleCallTimeout);
            socket.off("call-not-pickup", CallNotPick);
        };
    }, [socket, payload?.room_id, call, dispatch, onEnd, navigate]);
};