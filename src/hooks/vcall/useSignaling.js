import { Context } from "@/components/state/store-provider";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const useSignaling = ({ payload, call, socket, onEnd }) => {
    const { dispatch } = useContext(Context);
    useEffect(() => {
        if (!socket || !payload?.room_id) return;
        const handleCallAccepted = async (data) => {
            setTimeout(() => {
                dispatch({ type: 'model', payload: [false, null] });
                location.replace(`/v-calls/${data?.service_id}`);
            }, 3000)
        };
        const handleCallOffer = async ({ offer }) => {
            if (offer && call) {
                await call.handleOffer(offer);
            }
        };
        const handleCallAnswer = async ({ answer }) => {
            if (answer && call) {
                await call.handleAnswer(answer);
            }
        };
        const handleCallIce = async ({ candidate }) => {
            if (candidate && call) {
                await call.handleIceCandidate(candidate);
            }
        };
        const handleCallRejected = () => {
            toast.error("Call rejected");
            call.endCall();
            onEnd?.();
        };
        const handleCallEnded = () => {
            toast.success("Call ended");
            location.replace(`/v-calls`);
            // call.endCall();
            onEnd?.();
        };
        const handleCallTimeout = () => {
            toast.error("Maximum duration is finished!");
            call.endCall();
            onEnd?.();
        };
        const CallNotPick = () => {
            toast.error("Call not pickup by callee");
            call.endCall();
            onEnd?.();
        };
        socket.emit("register-socket", { user_id: payload?.user_id });
        socket.emit("join-room", payload);
        socket.on("vcall-accepted", handleCallAccepted);
        socket.on("vcall-offer", handleCallOffer);
        socket.on("vcall-answer", handleCallAnswer);
        socket.on("vcall-ice", handleCallIce);
        socket.on("vcall-rejected", handleCallRejected);
        socket.on("vcall-ended", handleCallEnded);
        socket.on("vcall-time-out", handleCallTimeout);
        socket.on("vcall-not-pickup", CallNotPick);
        return () => {
            socket.off("vcall-accepted", handleCallAccepted);
            socket.off("vcall-offer", handleCallOffer);
            socket.off("vcall-answer", handleCallAnswer);
            socket.off("vcall-ice", handleCallIce);
            socket.off("vcall-rejected", handleCallRejected);
            socket.off("vcall-ended", handleCallEnded);
            socket.off("vcall-time-out", handleCallTimeout);
            socket.off("vcall-not-pickup", CallNotPick);
        };
    }, [socket, payload.room_id]);
};