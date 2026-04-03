import { useEffect, useState } from "react";
import { useSocket } from "@/components/state/socket.provider";
export function useNewMessage() {
    const socket = useSocket();
    const [popup, setPopup] = useState(null);
    useEffect(() => {
        if (!socket) return;
        const handleMessage = (data) => {
            setPopup({
                sender: data?.sender,
                message: data?.message,
                avatar: data?.avatar,
                chatId: data?.order_id,
                media: data?.media,
            });
        };
        socket.on("message:sended", handleMessage);
        return () => {
            socket.off("message:sended", handleMessage);
        };
    }, [socket]);
    return { popup, setPopup };
}
