'use client';

import "./chat.history.card.css";
import EmptyState from "./empty-state.card";

export default function ChatHistoryCard({ data }) {
    if (!data?.length) {
        return (
            <EmptyState
                title="No messages found!"
                subtitle={null}
                goback={false}
                reload={false}
            />
        );
    }

    return (
        <div className="chat-container">
            {data.map((chat, i) => {
                const { message, media, from, createdAt } = chat;
                const isUser = from === "USER";

                return (
                    <div
                        key={i}
                        className={`chat-card ${isUser ? "chat-user" : "chat-vendor"}`}
                    >
                        <div className="chat-message">{message}</div>

                        <div className="chat-meta">
                            <span className="chat-from">
                                {isUser ? "You" : "Vendor"}
                            </span>
                            <span className="chat-type">{media}</span>
                            <span className="chat-date">
                                {ISTDate(createdAt)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}