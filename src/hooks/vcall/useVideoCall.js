import { AVCall } from "@/actions/a.vcall";
import { AVendor } from "@/actions/a.vendor";
import { Context } from "@/components/state/store-provider";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

export function useVideoCall(payload, socket, token) {
    const { dispatch } = useContext(Context);
    const router = useRouter();

    const peer = useRef(null);
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const ringtoneRef = useRef(null);
    const timerRef = useRef(null);

    const [state, setState] = useState({
        connected: false,
        incoming: false,
        call_accepted: false,
        camera_facing_mode: "user",
        call_duration: 0,
        reconnect_attempts: 0,
        disconnected: false,
        refused: false,
        is_reconnecting: false,
        is_muted: false,
        is_caller: false,
        is_video_off: false,
    });

    /* -------------------- RECONNECT -------------------- */
    const attemptReconnect = async () => {
        if (state.reconnect_attempts >= 5) {
            endCall();
            return;
        }

        const attempt = state.reconnect_attempts + 1;
        setState(p => ({ ...p, is_reconnecting: true, reconnect_attempts: attempt }));

        setTimeout(async () => {
            try {
                await createPeerConnection(state.is_caller);
                setState(p => ({ ...p, is_reconnecting: false, reconnect_attempts: 0 }));
            } catch {
                attemptReconnect();
            }
        }, Math.pow(2, attempt) * 1000);
    };

    /* -------------------- PEER -------------------- */
    const createPeerConnection = async (is_caller = false) => {
        // CLEANUP (CRITICAL)
        if (peer.current) {
            peer.current.close();
            peer.current = null;
        }
        localStream.current?.getTracks().forEach(t => t.stop());
        localStream.current = null;

        const turn = await AVendor.GetSocketCred();
        const iceServers = [{ urls: "stun:stun.l.google.com:19302" }];
        if (turn) {
            iceServers.push({
                urls: turn.urls,
                username: turn.username,
                credential: turn.credential
            });
        }

        peer.current = new RTCPeerConnection({ iceServers });

        peer.current.onconnectionstatechange = () => {
            if (["disconnected", "failed"].includes(peer.current.connectionState)) {
                attemptReconnect();
            }
        };

        peer.current.oniceconnectionstatechange = () => {
            if (["disconnected", "failed"].includes(peer.current.iceConnectionState)) {
                attemptReconnect();
            }
        };

        peer.current.onicecandidate = ({ candidate }) => {
            if (candidate) socket.emit("vcall-ice", { candidate, ...payload });
        };

        // ALWAYS CREATE TRACKS
        localStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: state.camera_facing_mode }
        });

        // SYNC STATE → TRACKS
        const audioTrack = localStream.current.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = !state.is_muted;

        const videoTrack = localStream.current.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = !state.is_video_off;

        localStream.current.getTracks().forEach(track =>
            peer.current.addTrack(track, localStream.current)
        );

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream.current;
            localVideoRef.current.onloadedmetadata = () => {
                localVideoRef.current.play().catch(() => {});
            };
        }

        remoteStream.current = new MediaStream();
        peer.current.ontrack = e => {
            remoteStream.current.addTrack(e.track);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream.current;
                remoteVideoRef.current.onloadedmetadata = () => {
                    remoteVideoRef.current.play().catch(() => {});
                };
            }
        };

        if (is_caller) {
            setState(p => ({ ...p, is_caller: true }));
        }

        if (is_caller && peer.current.signalingState === "stable") {
            const offer = await peer.current.createOffer();
            await peer.current.setLocalDescription(offer);
            socket.emit("vcall-offer", { offer, ...payload });
        }
    };

    const handleOffer = async offer => {
        if (!peer.current) await createPeerConnection(false);
        await peer.current.setRemoteDescription(offer);
        const answer = await peer.current.createAnswer();
        await peer.current.setLocalDescription(answer);
        socket.emit("vcall-answer", { room_id: payload.room_id, answer });
    };

    const handleAnswer = async answer => {
        await peer.current?.setRemoteDescription(answer);
        setState(p => ({ ...p, connected: true }));
    };

    const handleIceCandidate = async candidate => {
        if (peer.current && candidate) {
            await peer.current.addIceCandidate(candidate);
        }
    };

    /* -------------------- CONTROLS -------------------- */
    const toggleMute = () => {
        const track = localStream.current?.getAudioTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        setState(p => ({ ...p, is_muted: !track.enabled }));
    };

    const toggleVideo = () => {
        const track = localStream.current?.getVideoTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        setState(p => ({ ...p, is_video_off: !track.enabled }));
    };

    const flipCamera = async () => {
        const oldTrack = localStream.current?.getVideoTracks()[0];
        if (!oldTrack) return;

        const facingMode =
            oldTrack.getSettings().facingMode === "user"
                ? "environment"
                : "user";

        const newStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
            audio: true
        });

        const newTrack = newStream.getVideoTracks()[0];
        newTrack.enabled = !state.is_video_off;

        const sender = peer.current
            ?.getSenders()
            .find(s => s.track?.kind === "video");

        await sender?.replaceTrack(newTrack);

        oldTrack.stop();
        localStream.current.removeTrack(oldTrack);
        localStream.current.addTrack(newTrack);

        localVideoRef.current.srcObject = localStream.current;
        setState(p => ({ ...p, camera_facing_mode: facingMode }));
    };

    /* -------------------- TIMER -------------------- */
    const StartTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setState(p => ({ ...p, call_duration: p.call_duration + 1 }));
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setState(p => ({ ...p, call_duration: 0 }));
    };

    /* -------------------- CALL FLOW -------------------- */
    const AcceptCall = async () => {
        StopRingtone();
        const { success, data } = await AVCall.Update(
            payload.service_id,
            { field: "status:ongoing", data: {} },
            token
        );
        if (success) {
            socket.emit("accept-vcall", payload);
            dispatch({ type: "model", payload: [false, null] });
            setState(p => ({ ...p, call_accepted: true }));
            StartTimer();
            location.replace(`/v-calls/${data._id}`);
        }
    };

    const RejectCall = async () => {
        StopRingtone();
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        const { success, data, error, message } = await AVCall.Update(payload?.service_id, { field: "status:cancelled", data: {} }, token);
        if (success) {
            stopTimer();
            EndCallCleanup();
            socket.emit("reject-vcall", payload);
            setState(prev => ({ ...prev, incoming: false }));
            location.replace(`/`);
        } else {
            toast.error(error || message)
        };
    };

    const endCall = async () => {
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        stopTimer();
        setState(prev => ({ ...prev, connected: false, is_reconnecting: false, reconnect_attempts: 0, is_muted: false }));
        const { success, data, error, message } = await AVCall.Update(payload?.service_id, { field: "status:complete", data: {} }, token);
        if (success) {
            socket.emit("end-vcall", payload);
            location.replace(`/`);
        } else {
            location.replace(`/`);
            toast.error(error || message)
        };
    };

    /* -------------------- UTILS -------------------- */
    const PlayRingtone = () => {
        if (!ringtoneRef.current) {
            ringtoneRef.current = new Audio("/ringtone.mp3");
            ringtoneRef.current.loop = true;
        }
        ringtoneRef.current.play().catch(() => { });
    };

    const StopRingtone = () => {
        ringtoneRef.current?.pause();
        if (ringtoneRef.current) ringtoneRef.current.currentTime = 0;
    };

    const EndCallCleanup = () => {
        peer.current?.close();
        peer.current = null;
        localStream.current?.getTracks().forEach(t => t.stop());
        stopTimer();
    };

    const formatTime = sec => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    useEffect(() => {
        return () => EndCallCleanup();
    }, []);

    return {
        peer,
        localStream,
        remoteStream,
        localVideoRef,
        remoteVideoRef,
        state,
        createPeerConnection,
        handleOffer,
        handleAnswer,
        handleIceCandidate,
        toggleMute,
        toggleVideo,
        StartTimer,
        stopTimer,
        endCall,
        AcceptCall,
        RejectCall,
        PlayRingtone,
        StopRingtone,
        formatTime,
        flipCamera
    };
}
