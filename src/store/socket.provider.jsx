"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { socket } from "../library/socket.client";
import { Context } from "./store-provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const { state: { user }, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const initialized = useRef(false);

  const user_id = user?.vendor_id || null;
  const token = user?.token || null;

  useEffect(() => {
    // Only connect once when user_id & token exist
    if (!user_id || !token || initialized.current) return;

    socket.auth = { token, user_id };
    socket.connect();

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join-socket", { socket_id: user_id });
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
          navigate(`/chats/${order_id}`);
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
      initialized.current = true;
      console.log("Socket joined:", socket.id);
    };

    const handleError = (error) => {
      toast.error(`${error}`);
      console.error("Socket error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("wakeup", handleWakeup);
    socket.on("socket-joined", handleSocketJoined);
    socket.on("error", handleError);

    // Cleanup only on app unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("wakeup", handleWakeup);
      socket.off("socket-joined", handleSocketJoined);
      socket.off("error", handleError);

      if (socket.connected) socket.disconnect();
      initialized.current = false;
    };
  }, [user_id, token, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}