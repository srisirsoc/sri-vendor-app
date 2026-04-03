"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { socket } from "@/library/socket.client";
import { useRouter } from "next/navigation";
import { Context } from "./store-provider";
import toast from "react-hot-toast";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ lib, children }) {
    const { dispatch } = useContext(Context);
    const router = useRouter();
    const initialized = useRef(false);

    const user_id = lib.user?.vendor_id || null;
    const token = lib.token || null;
    useEffect(() => {
        if (!user_id || !token || initialized.current) return;
        socket.auth = { token, user_id };
        socket.connect();
        const handleConnect = () => {
            socket.emit("join-socket", { socket_id: user_id });
            initialized.current = true;
            console.log("Connected:", socket.id);
        };
        const handleDisconnect = (reason) => {
            console.warn("Socket disconnected:", reason);
            initialized.current = false;
        };
        const handleWakeup = ({ order }) => {

            if (!order?._id || !order?.type) return;
            const order_id = order._id;
            switch (order.type.toUpperCase()) {
                case "CHAT":
                    router.push(`/chats/${order_id}`);
                    break;
                case "CALL":
                    dispatch({ type: 'model', payload: [true, 'call-incomming-card', order, true] })
                    break;
                case "VCALL":
                    dispatch({ type: 'model', payload: [true, 'vcall-incomming-card', order, true] })
                    break;
                default:
                    console.warn("Unknown wakeup type:", order.type);
            }
        };
        const handleSocketJoined = ({ message }) => {
            initialized.current = true;
            console.log("Connected:", socket.id);
        };
        const handleError = (error) => {
            toast.error(`${error}`);
            console.error("Socket error:", error);
        };
        socket.on("connect", handleConnect);
        socket.emit("join-socket", { socket_id: user_id });
        socket.on("disconnect", handleDisconnect);
        socket.on("wakeup", handleWakeup);
        socket.on("socket-joined", handleSocketJoined);
        socket.on("error", handleError);
        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("wakeup", handleWakeup);
            socket.off("socket-joined", handleSocketJoined);
            socket.off("error", handleError);
            if (socket.connected) {
                socket.disconnect();
            };
            initialized.current = false;
        };
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
