import { useEffect, useRef } from "react";
import "./notification.card.css";

export default function NewMessagePopup(probs) {
    const { open, sender, message, avatar, media, autoClose, sound, onClose, onOpenChat } = probs;
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    useEffect(() => {
        if (open) {
            if (sound && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { });
            };
            if (autoClose) {
                timerRef.current = setTimeout(() => { onClose?.(); }, autoClose);
            }
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [open, autoClose, sound, onClose]);

    if (!open) return null;

    return (
        <>
            <audio ref={audioRef} preload="auto">
                <source src="/notification.mp3" type="audio/mpeg" />
            </audio>
            <div className="msg-popup">
                <div className="msg-avatar">
                    {avatar ? (<img src={avatar} alt={sender} />) : (<span>{sender?.charAt(0)}</span>)}
                </div>
                <div className="msg-content" onClick={onOpenChat}>
                    <h4>{sender}</h4>
                    {media == "IMAGE" && (<img src={message} alt={sender} />)}
                    {media == "TEXT" && (<p>{message}</p>)}
                    {media == "AUDIO" && (<p>Audio</p>)}
                    {autoClose && (<div className="msg-timer" style={{ animationDuration: `${autoClose}ms` }} />)}
                </div>

                <button className="msg-close" onClick={onClose}>✕</button>
            </div>
        </>
    );
}
