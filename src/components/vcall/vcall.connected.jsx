import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneAlt, FaSyncAlt, FaSignal } from "react-icons/fa";

import { useEffect, useState } from "react";
import "./vcall.connected.css";

export default function VideoCallConnected(props) {
    const { service, state, actions, peerConnection, remoteVideoRef, localVideoRef } = props;
    const [networkQuality, setNetworkQuality] = useState("good");

    useEffect(() => {
        if (!peerConnection) return;
        const interval = setInterval(async () => {
            const stats = await peerConnection.getStats();
            stats.forEach(report => {
                if (report.type === "candidate-pair" && report.state === "succeeded" && report.currentRoundTripTime) {
                    const rtt = report.currentRoundTripTime;
                    if (rtt < 0.15) setNetworkQuality("good");
                    else if (rtt < 0.4) setNetworkQuality("medium");
                    else setNetworkQuality("poor");
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [peerConnection]);

    useEffect(() => {
        let wakeLock = null;
        const lock = async () => {
            try {
                if ("wakeLock" in navigator) { wakeLock = await navigator.wakeLock.request("screen"); }
            } catch { }
        };
        lock();
        return () => wakeLock?.release();
    }, []);

    const formatTime = (sec) => {
        if (!sec || sec < 1) return;
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
        <div className="call-screen">

            <div className="video-wrapper">
                <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
                <video ref={localVideoRef} autoPlay muted playsInline className="local-video-preview" />
            </div>

            <div className="top-bar">
                <div className={`network ${networkQuality}`}> <FaSignal /> <span>{networkQuality}</span></div>
                {/* <div className="timer">{formatTime(state.call_duration)}</div> */}
            </div>

            <div className="controls">
                <div className="timer">{formatTime(timer_sec + state.call_duration)}</div>
                <button className={`circle-btn ${state.is_muted ? "muted" : ""}`} onClick={actions.toggleMute} >
                    {state.is_muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>

                <button className={`circle-btn ${state.is_video_off ? "muted" : ""}`} onClick={actions.toggleVideo} >
                    {state.is_video_off ? <FaVideoSlash /> : <FaVideo />}
                </button>

                <button className="circle-btn" onClick={actions.flipCamera} >
                    <FaSyncAlt />
                </button>

                <button className="circle-btn end" onClick={actions.endCall} >
                    <FaPhoneAlt />
                </button>
            </div>
        </div>
    );
}
