"use client";
import { useRef, useState } from "react";
import { socket } from "../../library/socket.client";

const createRecordingStream = (local, remote) => {
    if (typeof window === "undefined" || !local || !remote) return null;

    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const dest = ctx.createMediaStreamDestination();

        const localSource = ctx.createMediaStreamSource(local);
        const remoteSource = ctx.createMediaStreamSource(remote);

        localSource.connect(dest);
        remoteSource.connect(dest);

        return { stream: dest.stream, ctx };
    } catch (err) {
        console.error("Failed to create recording stream:", err);
        return null;
    }
};

export const useRecording = ({ payload }) => {
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const ctxRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async (localStream, remoteStream) => {
        if (typeof window === "undefined" || !localStream || !remoteStream) return;

        try {
            const startAudio = new Audio("/recording-start.mp3");
            await startAudio.play();
            socket.emit("call-recording-started", payload);

            const result = createRecordingStream(localStream, remoteStream);
            if (!result) return;

            ctxRef.current = result.ctx;

            if (!window.MediaRecorder) {
                console.error("MediaRecorder not supported in this browser");
                return;
            }

            recorderRef.current = new MediaRecorder(result.stream, {
                mimeType: "audio/webm;codecs=opus",
            });

            chunksRef.current = [];
            recorderRef.current.ondataavailable = e => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                // Optional: upload to server
                chunksRef.current = [];
            };

            recorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Failed to start recording:", err);
        }
    };

    const stopRecording = async () => {
        if (!recorderRef.current) return;

        try {
            const stopAudio = new Audio("/recording-stop.mp3");
            await stopAudio.play();
            socket.emit("call-recording-stopped", payload);

            recorderRef.current.stop();
            ctxRef.current?.close();

            recorderRef.current = null;
            ctxRef.current = null;
            setIsRecording(false);
        } catch (err) {
            console.error("Failed to stop recording:", err);
        }
    };

    return { isRecording, startRecording, stopRecording };
};