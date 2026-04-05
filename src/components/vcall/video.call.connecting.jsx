import { FaVideo, FaPhoneSlash } from "react-icons/fa";
import "./vcall.main.css";
import "./video.call.connecting.css";
import { useNavigate } from "react-router-dom";
import { useVideoCall } from "@/hooks/vcall/useVideoCall";
import { useSignaling } from "@/hooks/vcall/useSignaling";
import { useSocket } from "../../store/socket.provider";

export default function VideoCallConnecting({ order, token }) {
    const socket = useSocket();
    const user = order?.user || {};
    const service = order?.service || {};
    const navigate = useNavigate(); // React Router hook

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

    // Signaling with React Router navigation
    useSignaling({
        payload,
        call,
        socket,
        onEnd: () => navigate("/"), // navigate instead of location.replace
    });

    const handleDecline = async () => {
        await call.RejectCall();
        call.ringtoneRef.current?.pause();
        navigate("/"); // replace router.replace with navigate
    };

    return (
        <div>
            <div className="video-call-card">
                {/* Avatar / video preview */}
                <div className="video-avatar-wrap">
                    <img
                        src={user?.avatar || "/user.png"}
                        alt={user?.name}
                        className="video-avatar"
                    />

                    {/* Ripple animation */}
                    <span className="video-wave wave-1" />
                    <span className="video-wave wave-2" />
                    <span className="video-wave wave-3" />

                    {/* Video icon */}
                    <div className="video-badge">
                        <FaVideo />
                    </div>
                </div>

                {/* User info */}
                <h3 className="video-name">{user?.name}</h3>
                <p className="video-meta">Video Call</p>

                {/* Status */}
                <div className="video-status">
                    <FaVideo /> Connecting…
                </div>

                {/* Actions */}
                <div className="video-actions">
                    <button className="video-btn decline" onClick={handleDecline}>
                        <FaPhoneSlash /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}