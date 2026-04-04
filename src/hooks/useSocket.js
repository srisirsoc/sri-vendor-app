import { useContext } from "react";
import { SocketContext } from "@/components/state/socket.context";

export function useSocket() {
    return useContext(SocketContext);
}