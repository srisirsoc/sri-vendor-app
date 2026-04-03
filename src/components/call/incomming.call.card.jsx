"use client";
import { useEffect } from "react";
import { FaAudible, FaPhoneAlt, FaPhoneSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCall } from "../../hooks/call/useCall";
import { useSignaling } from "../../hooks/call/useSignaling";
import { socket } from "@/library/socket.client";
import "./incomming.call.card.css";
import { useMediaSupport } from "@/hooks/useMediaSupport";

export default function IncomingCallCard({ order, token }) {
    const router = useRouter();
    const user = order?.user || {};
    const service = order?.service || {};

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

    const { acceptCall, error } = useMediaSupport({ call });

    const handleAccept = () => {
        acceptCall({ audio: true, video: false }, () => {
            call.ringtoneRef.current?.pause();
        });
    };

    useEffect(() => {
        if (!call.ringtoneRef.current) return;
        const audio = call.ringtoneRef.current;
        audio.loop = true;
        audio.play().catch(() => { });
        return () => { audio.pause(); audio.currentTime = 0 };
    }, [order?._id]);

    const handleDecline = async () => {
        await call.RejectCall();
        call.ringtoneRef.current?.pause();
        router.replace("/");
    };

    return (
        <div className="call-main">
            <div className="call-card incoming">
                <audio ref={call.ringtoneRef} src="/ringtone.mp3" />

                <div className="audio-avatar-wrap">
                    <img
                        src={user?.avatar || "/user.png"}
                        alt={user?.name || "User"}
                        className="audio-avatar"
                    />

                    <span className="wave" />
                    <span className="wave wave-2" />
                    <span className="wave wave-3" />

                    <div className="audio-badge">
                        <FaAudible />
                    </div>
                </div>

                <h2 className="name">{user?.name || "Unknown"}</h2>

                <p className="meta">
                    Incoming {order?.type || "Call"} • {order?.service?.category || "N/A"}
                </p>

                <div className="status incoming">Incoming Call…</div>

                <div className="call-actions">
                    <button className="incomming-call-btn accept" onClick={handleAccept}>
                        <FaPhoneAlt /> Accept
                    </button>

                    <button className="incomming-call-btn decline" onClick={handleDecline}>
                        <FaPhoneSlash /> Reject
                    </button>
                </div>

                <audio ref={call.remoteAudioRef} autoPlay playsInline />

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}
