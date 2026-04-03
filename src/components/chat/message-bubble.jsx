"use client";

import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { useState } from "react";
import "./message-bubble.css";

export default function MessageBubble({ m, isTyping = false }) {
  const isUser = m?.from === "VENDOR";
  const [zoom, setZoom] = useState(null);

  if (isTyping) {
    return (
      <div className="message-row left">
        <div className="message-bubble vendor typing">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`message-row ${isUser ? "right" : "left"}`}>
        <div className={`message-bubble ${isUser ? "user" : "vendor"}`}>
          {m.media === "TEXT" && <p>{m.message}</p>}
          {m.media === "IMAGE" && (
            <img
              src={m.message}
              className="message-image"
              onClick={() => setZoom(m.message)}
            />
          )}
          {m.media === "AUDIO" && (
            <audio controls src={m.message} />
          )}

          <div className="message-meta">
            <span>{m.time}</span>
            {isUser &&
              (m.seen ? <FaCheckDouble /> : m.delivered ? <FaCheck /> : null)}
          </div>
        </div>
      </div>

      {zoom && (
        <div className="zoom-overlay" onClick={() => setZoom(null)}>
          <img src={zoom} />
        </div>
      )}
    </>
  );
}
