"use client";
import { io } from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL || null;
const MODE = import.meta.env.VITE_MODE || "PROD";
if (!URL) throw new Error("Socket base url not found");
const soc = MODE == "DEV" ? "/socket.io/" : "/srisir/socket.io/";
export const socket = io(URL, {
    path: soc,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});