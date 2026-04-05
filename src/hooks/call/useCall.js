import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "@/store/store-provider";
import { ACall } from "../../actions/a.call";
import { AVendor } from "../../actions/a.vendor";

export function useCall(payload, socket, is_caller = false, token) {
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();

    const peer = useRef(null);
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const remoteAudioRef = useRef(null);
    const ringtoneRef = useRef(null);
    const timerRef = useRef(null);

    const [state, setState] = useState({
        connected: false,
        incoming: false,
        caller_name: "User",
        call_accepted: false,
        is_muted: false,
        call_duration: 0,
        is_reconnecting: false,
        reconnect_attempts: 0,
        is_caller: false,
        disconnected: false,
        refused: false
    });

    /* -------------------- RECONNECT -------------------- */
    const attemptReconnect = async () => {
        if (state.reconnect_attempts >= 5) {
            endCall();
            return;
        }
        const attempt = state.reconnect_attempts + 1;
        setState(prev => ({ ...prev, is_reconnecting: true, reconnect_attempts: attempt }));
        const delay = Math.pow(2, attempt) * 1000;
        setTimeout(async () => {
            try {
                await createPeerConnection(state.is_caller);
                setState(prev => ({ ...prev, is_reconnecting: false, reconnect_attempts: 0 }));
            } catch {
                attemptReconnect();
            }
        }, delay);
    };

    /* -------------------- PEER -------------------- */
    const createPeerConnection = async () => {
        const turn = await AVendor.GetSocketCred();
        const iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
        if (turn) iceServers.push({ urls: turn.urls, username: turn.username, credential: turn.credential });

        peer.current = new RTCPeerConnection({ iceServers });

        peer.current.onconnectionstatechange = () => {
            const s = peer.current.connectionState;
            if (s === "failed" || s === "disconnected") attemptReconnect();
        };

        peer.current.oniceconnectionstatechange = () => {
            const s = peer.current.iceConnectionState;
            if (s === "failed" || s === "disconnected") attemptReconnect();
        };

        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStream.current.getTracks().forEach(track => peer.current.addTrack(track, localStream.current));

        remoteStream.current = new MediaStream();
        peer.current.ontrack = e => {
            remoteStream.current.addTrack(e.track);
            if (remoteAudioRef.current) remoteAudioRef.current.srcObject = remoteStream.current;
        };

        peer.current.onicecandidate = ({ candidate }) => {
            if (candidate) socket.emit("call-ice", { candidate, ...payload });
        };

        if (is_caller && peer.current.signalingState === "stable") {
            const offer = await peer.current.createOffer();
            await peer.current.setLocalDescription(offer);
            socket.emit("call-offer", { offer, audioOnly: true, ...payload });
        }
    };

    const handleOffer = async (offer) => {
        if (!offer) return;
        if (!peer.current) await createPeerConnection();
        await peer.current.setRemoteDescription(offer);
        const answer = await peer.current.createAnswer();
        await peer.current.setLocalDescription(answer);
        socket.emit("call-answer", { room_id: payload.room_id, answer });
    };

    const handleAnswer = async (answer) => {
        if (!peer.current) return;
        await peer.current.setRemoteDescription(answer);
        setState(prev => ({ ...prev, connected: true }));
    };

    const handleIceCandidate = async (candidate) => {
        if (peer.current && candidate) await peer.current.addIceCandidate(candidate);
    };

    /* -------------------- CONTROLS -------------------- */
    const toggleMute = () => {
        const track = localStream.current?.getAudioTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        setState(prev => ({ ...prev, is_muted: !track.enabled }));
    };

    const StartTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setState(prev => ({ ...prev, call_duration: prev.call_duration + 1 }));
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setState(prev => ({ ...prev, call_duration: 0 }));
    };

    const endCall = async () => {
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        stopTimer();
        setState(prev => ({ ...prev, connected: false, is_reconnecting: false, reconnect_attempts: 0, is_muted: false }));
        const { success, error, message } = await ACall.Update(payload?.service_id, { field: "status:complete", data: {} }, token);
        if (success) {
            socket.emit("end-call", payload);
            navigate(`/`, { replace: true });
        } else {
            toast.error(error || message);
        }
    };

    const AcceptCall = async () => {
        StopRingtone();
        const { success, data, error, message } = await ACall.Update(payload?.service_id, { field: "status:ongoing", data: {} }, token);
        if (success) {
            socket.emit("accept-call", payload);
            dispatch({ type: 'model', payload: [false, null] });
            setState(prev => ({ ...prev, call_accepted: true, incoming: false, disconnected: false, refused: false }));
            StartTimer();
            navigate(`/calls/${data?._id}`, { replace: true });
        } else {
            toast.error(error || message);
        }
    };

    const RejectCall = async () => {
        StopRingtone();
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        const { success, error, message } = await ACall.Update(payload?.service_id, { field: "status:cancelled", data: {} }, token);
        if (success) {
            stopTimer();
            EndCallCleanup();
            socket.emit("reject-call", payload);
            setState(prev => ({ ...prev, incoming: false }));
            navigate(`/`, { replace: true });
        } else {
            toast.error(error || message);
        }
    };

    /* -------------------- RINGTONE -------------------- */
    const PlayRingtone = () => {
        if (!ringtoneRef.current) {
            ringtoneRef.current = new Audio("/ringtone.mp3");
            ringtoneRef.current.loop = true;
        }
        ringtoneRef.current.currentTime = 0;
        ringtoneRef.current.play().catch(() => { });
    };

    const StopRingtone = () => {
        if (ringtoneRef.current) {
            ringtoneRef.current.pause();
            ringtoneRef.current.currentTime = 0;
        }
    };

    /* -------------------- CLEANUP -------------------- */
    const EndCallCleanup = () => {
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        clearInterval(timerRef.current);
        setState(prev => ({ ...prev, incoming: false, call_accepted: false, is_reconnecting: false, reconnect_attempts: 0, call_duration: 0 }));
    };

    useEffect(() => {
        return () => {
            stopTimer();
            EndCallCleanup();
        };
    }, []);

    return {
        peer,
        localStream,
        remoteStream,
        remoteAudioRef,
        ringtoneRef,
        state,
        createPeerConnection,
        handleOffer,
        handleAnswer,
        handleIceCandidate,
        toggleMute,
        StartTimer,
        stopTimer,
        endCall,
        AcceptCall,
        RejectCall,
        PlayRingtone,
        StopRingtone,
        EndCallCleanup
    };
}