"use client";
import React, { useEffect } from "react";
import { socket } from "@/library/socket.client";
import { useVideoCall } from "../../hooks/vcall/useVideoCall";
import VideoCallConnected from "./vcall.connected";
import { useSignaling } from "../../hooks/vcall/useSignaling";
import "./vcall.main.css";

export default function VCallMain({ lib }) {
    const order = lib?.docs || {};
    const token = lib?.token;
    const service = order?.service || {};
    const payload = {
        room_id: service?.token,
        order_id: order?._id,
        service_id: service?._id,
        user_id: order?.user?.id,
        vendor_id: order?.vendor?.id,
        call_type: "video",
    };
    const is_caller = order?.id ? true : false;
    const call = useVideoCall(payload, socket, token);
    const { state, peer, localVideoRef, remoteVideoRef, formatTime } = call;
    useSignaling({ payload, call, socket, onEnd: () => { } });

    useEffect(() => {
        if (!order?._id) return;
        call.createPeerConnection(is_caller);
        call.StartTimer();
    }, [order?._id]);

    return (
        <div className="call-main">

            {state.is_reconnecting && (
                <div className="reconnecting-banner">
                    <div className="dots">
                        <span />
                        <span />
                        <span />
                    </div>
                    Reconnecting… ({state.reconnect_attempts})
                </div>
            )}

            <VideoCallConnected
                state={state}
                actions={call}
                service={service}
                peerConnection={peer.current}
                remoteVideoRef={remoteVideoRef}
                localVideoRef={localVideoRef}
                formatTime={formatTime}
            />
        </div>
    );
}
