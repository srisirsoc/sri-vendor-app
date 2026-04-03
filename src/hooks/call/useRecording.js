"use client";
import { useRef, useState } from "react";
import { socket } from "@/library/socket.client";

const createRecordingStream = (local, remote) => {
    if (typeof window === "undefined" || !local || !remote) return null;

    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();

    try {
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
            // Play start sound
            await new Audio("/recording-start.mp3").play();
            socket.emit("call-recording-started", payload);

            const result = createRecordingStream(localStream, remoteStream);
            if (!result) return;

            ctxRef.current = result.ctx;

            recorderRef.current = new MediaRecorder(result.stream, {
                mimeType: "audio/webm;codecs=opus"
            });

            chunksRef.current = [];
            recorderRef.current.ondataavailable = e => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                // Optional: auto-download or upload
                // const url = URL.createObjectURL(blob);
                // const a = document.createElement("a");
                // a.href = url;
                // a.download = "recording.webm";
                // a.click();
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
            await new Audio("/recording-stop.mp3").play();
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
