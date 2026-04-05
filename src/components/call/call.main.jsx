"use client";
import "./call.main.css";
import React, { useEffect } from "react";
import CallConnected from "./call.connected.card";
import { useCall } from "../../hooks/call/useCall";
import { useRecording } from "../../hooks/call/useRecording";
import { useSignaling } from "../../hooks/call/useSignaling";
import { useSocket } from "../../store/socket.provider";

function CallsPage({ lib }) {
    const socket = useSocket(); // Assuming socket is globally available
    const order = lib?.docs || {};
    const token = lib.token;
    const service = order?.service || {};

    const payload = {
        room_id: service?.token,
        order_id: order?._id,
        service_id: service?._id,
        user_id: order?.user?.id,
        vendor_id: order?.vendor?.id
    };

    const is_caller = true;
    const call = useCall(payload, socket, is_caller, token);
    const recording = useRecording({ payload });

    useSignaling({ payload, call, socket, onEnd: () => location.replace("/") });

    useEffect(() => {
        call.createPeerConnection(is_caller);
        call.StartTimer();
    }, []);

    return (
        <div className="call-main">
            {call.state.is_reconnecting && (
                <div className="reconnecting-banner">
                    Reconnecting… ({call.state.reconnect_attempts})
                </div>
            )}

            <CallConnected
                order={order}
                isMuted={call.state.is_muted}
                callDuration={call.state.call_duration}
                remoteAudioRef={call.remoteAudioRef}
                localStream={call.localStream}
                remoteStream={call.remoteStream}
                toggleMute={call.toggleMute}
                endCall={call.endCall}
                onStartRecording={() =>
                    recording.startRecording(
                        call.localStream.current,
                        call.remoteStream.current
                    )
                }
                onStopRecording={recording.stopRecording}
                isRecording={recording.isRecording}
            />
        </div>
    );
}

export default CallsPage;