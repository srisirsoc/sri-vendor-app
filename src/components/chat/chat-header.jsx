"use client";
import { FaBars } from "react-icons/fa";
import "./chat-header.css";

export default function ChatHeader({ typing, chat_info, toggleSidebar, is_chats }) {
    const v = chat_info?.user || {};
    if (is_chats) {
        return (
            <div className="chat-header">
                <button className="menu-btn" onClick={toggleSidebar}><FaBars /></button>
            </div>
        )
    };
    return (
        <div className="chat-header">
            <button className="menu-btn" onClick={toggleSidebar}>
                <FaBars />
            </button>

            <img
                src={v?.avatar || "/user.png"}
                alt="avatar"
                className="header-avatar"
            />

            <div className="chat-header-info">
                <h4>{v?.name || "Unknown"}</h4>
                <span className={`status ${typing ? "typing-status" : ""}`}>
                    {typing ? "typing..." : "online"}
                </span>
            </div>
        </div>
    );
}
