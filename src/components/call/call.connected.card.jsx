"use client";

import React from "react";
import { FaMicrophone, FaMicrophoneSlash, FaPhoneAlt } from "react-icons/fa";
import "./call.connected.card.css";

export default function CallConnected(props) {
    const { order, remoteAudioRef, isMuted, toggleMute, endCall, callDuration } = props;

    const user = order?.vendor || {};
    const vendor = order?.user || {};
    const service = order?.service || {};

    const formatTime = (sec) => {
        if (!sec || sec < 1) return "0:00";
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    const now = new Date();
    const old_date = service?.start_at || service?.createdAt || now;
    const givenDate = new Date(old_date);
    const seconds = (now - givenDate) / 1000;
    const timer_sec = Math.round(seconds);

    return (
        <div className="call-screen connected">
            <audio ref={remoteAudioRef} autoPlay playsInline muted={false} />

            <div className="call-card">
                <div className="call-header">
                    <div className="user-info">
                        <img src={vendor?.avatar || "/user.png"} alt={vendor.name} />
                        <div>
                            <h3>{vendor?.name}</h3>
                            <span className="call-status">Connected</span>
                        </div>
                    </div>
                </div>

                <div className="talking-area">
                    <div className="speaker local">
                        <img src={user.avatar || "/user.png"} alt={user.name} />
                        <span>{user?.name?.split(" ")[0]}</span>
                    </div>

                    <div className="call-middle">
                        <div className="timer">{formatTime(timer_sec + callDuration)}</div>
                        <div className="call-wave">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="speaker remote active">
                        <img src={vendor.avatar || "/user.png"} alt={vendor.name} />
                        <span>{vendor?.name?.split(" ")[0]}</span>
                    </div>
                </div>

                <div className="controls">
                    <button
                        className={`circle-btn ${isMuted ? "muted" : ""}`}
                        onClick={toggleMute}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>

                    <button className="circle-btn end" onClick={endCall}>
                        <FaPhoneAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}