"use client";
import { FaPhoneAlt, FaRedo, FaPhoneSlash, FaAudible } from "react-icons/fa";
import { useCall } from "../../hooks/call/useCall";
import { useSignaling } from "../../hooks/call/useSignaling";
import { useRouter } from "next/navigation";
import "./call.connecting.card.css";
import { useSocket } from "../../store/socket.provider";

export default function CallConnecting({ order, token }) {
    const user = order?.user || {};
    const service = order?.service || {};
    const router = useRouter();
    const socket = useSocket(); // Assuming socket is globally available

    const payload = {
        room_id: service?.token,
        order_id: order?._id,
        service_id: service?._id,
        user_id: order?.user?.id,
        vendor_id: order?.vendor?.id
    };

    const is_caller = false;
    const call = useCall(payload, socket, is_caller, token);
    useSignaling({ payload, call, socket, onEnd: () => location.replace("/") });

    const handleDecline = async () => {
        await call.RejectCall();
        call.ringtoneRef.current?.pause();
        router.replace("/");
    };

    return (
        <div className="call-main">
            <div className="call-card">
                <div className="audio-avatar-wrap">
                    <img
                        src={user?.avatar || "/user.png"}
                        alt={user?.name || "User"}
                        className="audio-avatar"
                    />

                    {/* Waves */}
                    <span className="wave" />
                    <span className="wave wave-2" />
                    <span className="wave wave-3" />

                    {/* Badge */}
                    <div className="audio-badge">
                        <FaAudible />
                    </div>
                </div>

                {/* User Info */}
                <h2 className="name">{user?.name || "Unknown"}</h2>
                <p className="meta">
                    {order?.type || "Call"} • {order?.service?.category || "N/A"}
                </p>

                {/* Status */}
                {!call.state.connected && (
                    <div className="status">
                        <FaPhoneAlt /> Connecting…
                    </div>
                )}
                {call.state.refused && <div className="status error">Call Refused</div>}
                {call.state.disconnected && <div className="status error">Connection Lost</div>}

                {/* Action Buttons */}
                <div className="call-actions">
                    {call.state.refused && (
                        <button className="call-connecting-btn reconnect" onClick={() => window.location.reload()}>
                            <FaRedo /> Connect Again
                        </button>
                    )}
                    {!call.state.connected && (
                        <button className="call-connecting-btn decline" onClick={handleDecline}>
                            <FaPhoneSlash /> Decline
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}