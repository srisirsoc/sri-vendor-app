"use client";
/* @refresh reset */

import { useContext, useEffect, useRef } from "react";
import { socket } from "@/library/socket.client";
import { useRouter } from "next/navigation";
import { Context } from "./store-provider";
import toast from "react-hot-toast";
import { SocketContext } from "./socket.context";

export function SocketProvider({ children }) {
    const { state: { user }, dispatch, } = useContext(Context);

    const router = useRouter();
    const initialized = useRef(false);

    const user_id = user?.vendor_id;
    const token = user?.token;

    useEffect(() => {
        if (!user_id || !token) return;

        // Prevent duplicate init
        if (initialized.current && socket.connected) return;

        socket.auth = { token, user_id };
        socket.connect();

        const handleConnect = () => {
            console.log("Connected:", socket.id);

            socket.emit("join-socket", { socket_id: user_id });

            initialized.current = true;
        };

        const handleDisconnect = (reason) => {
            console.warn("Socket disconnected:", reason);
            initialized.current = false;
        };

        const handleWakeup = ({ order }) => {
            if (!order?._id || !order?.type) return;

            const order_id = order._id;

            switch (order.type?.toUpperCase()) {
                case "CHAT":
                    router.push(`/chats/${order_id}`);
                    break;

                case "CALL":
                    dispatch({
                        type: "model",
                        payload: [true, "call-incomming-card", order, true],
                    });
                    break;

                case "VCALL":
                    dispatch({
                        type: "model",
                        payload: [true, "vcall-incomming-card", order, true],
                    });
                    break;

                default:
                    console.warn("Unknown wakeup type:", order.type);
            }
        };

        const handleSocketJoined = () => {
            console.log("Socket joined:", socket.id);
            initialized.current = true;
        };

        const handleError = (error) => {
            toast.error(String(error));
            console.error("Socket error:", error);
        };

        // Register listeners
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("wakeup", handleWakeup);
        socket.on("socket-joined", handleSocketJoined);
        socket.on("error", handleError);

        // Cleanup
        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("wakeup", handleWakeup);
            socket.off("socket-joined", handleSocketJoined);
            socket.off("error", handleError);

            if (socket.connected) {
                socket.disconnect();
            }

            initialized.current = false;
        };
    }, [user_id, token, router, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}