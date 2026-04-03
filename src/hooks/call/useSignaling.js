import { Context } from "@/components/state/store-provider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const useSignaling = ({ payload, call, socket, onEnd }) => {
    const { dispatch } = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        if (!socket || !payload?.room_id) return;

        const handleCallAccepted = async (data) => {
            dispatch({ type: 'model', payload: [false, null] });
            console.log(data);            
            location.replace(`/calls/${data?.service_id}`)
        };

        const handleCallOffer = async ({ offer }) => {
            await call.handleOffer(offer);
        };

        const handleCallAnswer = async ({ answer }) => {
            await call.handleAnswer(answer);
        };

        const handleCallIce = async ({ candidate }) => {
            await call.handleIceCandidate(candidate);
        };

        const handleCallRejected = () => {
            toast.error("Call rejected");
            call.endCall();
            onEnd?.();
        };

        const handleCallEnded = () => {
            toast.success("Call ended");
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
            socket.on("call-not-pickup", CallNotPick);
        };
    }, [payload?.room_id]);
};