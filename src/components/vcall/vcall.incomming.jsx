import { FaPhone, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useVideoCall } from "@/hooks/vcall/useVideoCall";
import { useSignaling } from "@/hooks/vcall/useSignaling";
import { useNavigate } from "react-router-dom";
import { socket } from "@/library/socket.client";
import "./vcall.incomming.css";

export default function IncomingVideoCall({ order, token }) {
    const navigate = useNavigate();
    const user = order?.vendor;
    const service = order?.service || {};
    const payload = {
        room_id: service?.token,
        order_id: order?._id,
        service_id: service?._id,
        user_id: order?.user?.id,
        vendor_id: order?.vendor?.id,
        call_type: "video",
    };
    const is_caller = false;
    const call = useVideoCall(payload, socket, token);
    useSignaling({ payload, call, socket, onEnd: () => location.replace("/") });
    useEffect(() => {
        call.PlayRingtone();
    }, [order?._id]);
    const handleAccept = async () => {
        await call.AcceptCall();
        call.StopRingtone();
    };
    const handleDecline = async () => {
        await call.RejectCall();
        call.StopRingtone();
        navigate("/");
    };

    return (
        <div>
            <div className="video-incoming-card">
                {/* Avatar */}
                <div className="avatar-wrap">
                    <span className="pulse"></span>
                    <span className="pulse pulse-2"></span>
                    <img
                        src={user?.avatar || "/user.png"}
                        alt={user.name}
                        className="avatar"
                    />
                </div>

                {/* Info */}
                <h3 className="name">{user?.name}</h3>
                <div className="meta">
                    <FaVideo /> Incoming Video Call
                </div>

                {/* Countdown */}
                <div className="countdown">
                    Auto reject in <strong>{0}s</strong>
                </div>

                {/* Actions */}
                <div className="call-actions">
                    <button className="vcall-btn accept" onClick={handleAccept}>
                        <FaPhone /> Accept
                    </button>

                    <button className="vcall-btn decline" onClick={handleDecline}>
                        <FaPhoneAlt /> Reject
                    </button>
                </div>

            </div>
        </div>
    );
}
