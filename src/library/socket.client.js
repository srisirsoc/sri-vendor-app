"use client";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;
const MODE = import.meta.env.VITE_MODE || "PROD";
if (!URL) throw new Error("Socket base url not found");

const path = MODE === "DEV" ? "/socket.io/" : "/srisir/socket.io/";

export const socket = io(URL, {
    path,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

socket.onAny((event, ...args) => {
    // console.log("[Socket Event]", event, args);
});

socket.on("connect_error", (err) => {
    console.error("[Socket Connect Error]", err);
});