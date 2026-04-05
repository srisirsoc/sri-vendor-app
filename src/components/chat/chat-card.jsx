"use client";
import "./chat-card.css";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-message";
import ChatInput from "./chat-input";
import EmojiPicker from "./emoji.card";
import toast from "react-hot-toast";
import { AChat } from "../../actions/a.chat";
import { socket } from "../../library/socket.client";
import { UploadFileWithProgress } from "../../library/upload.file";
import { Context } from "../../store/store-provider";
import { useNavigate } from "react-router-dom";

export default function ChatCard({ lib }) {
    const { dispatch } = useContext(Context);
    const router = useNavigate();

    const doc = lib?.chat_info || {};
    const token = lib?.token || null;

    const user_id = doc?.vendor_id;
    const remote_id = doc?.user_id;

    const [messages, setMessages] = useState(lib.messages || []);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [image, setImage] = useState(null);
    const [recording, setRecording] = useState(false);
    const [audio, setAudio] = useState(null);

    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const fileInputRef = useRef(null);
    const messageEndRef = useRef(null);
    const sidebarRef = useRef(null);
    const refreshCountRef = useRef(0);

    // ✅ Sync messages with lib
    useEffect(() => {
        setMessages(lib.messages || []);
    }, [lib.messages]);

    // ✅ Socket setup with cleanup
    useEffect(() => {
        if (!user_id || !remote_id) return;

        socket.emit("chat-room", { room_id: user_id });

        const handleMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
            socket.emit("seen", msg.id);

            refreshCountRef.current += 1;
        };

        const handleTyping = ({ from }) => {
            if (from === remote_id) {
                setTyping(true);
                setTimeout(() => setTyping(false), 800);
            }
        };

        const handleDelivered = (id) => {
            setMessages((p) =>
                p.map((m) => (m.id === id ? { ...m, delivered: true } : m))
            );
        };

        const handleSeen = (id) => {
            setMessages((p) =>
                p.map((m) => (m.id === id ? { ...m, seen: true } : m))
            );
        };

        socket.on("message:sended", handleMessage);
        socket.on("typing", handleTyping);
        socket.on("delivered", handleDelivered);
        socket.on("seen_update", handleSeen);

        return () => {
            socket.off("message:sended", handleMessage);
            socket.off("typing", handleTyping);
            socket.off("delivered", handleDelivered);
            socket.off("seen_update", handleSeen);
        };
    }, [user_id, remote_id]);

    // ✅ Auto scroll
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ✅ Click outside sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const resetMedia = () => {
        setText("");
        setImage(null);
        setAudio(null);
        setUploadProgress(0);
    };

    const sendMessage = async () => {
        if (!text && !image && !audio) return;

        let media_type = "TEXT";
        let source = null;

        try {
            if (image) {
                const res = await UploadFileWithProgress(
                    image,
                    token,
                    setUploadProgress
                );
                if (!res.success) {
                    toast.error(res.error || res.message);
                    return;
                }
                media_type = "IMAGE";
                source = res.data.url;
            }

            if (audio) {
                const res = await UploadFileWithProgress(
                    audio,
                    token,
                    setUploadProgress
                );
                if (!res.success) {
                    toast.error(res.error || res.message);
                    return;
                }
                media_type = "AUDIO";
                source = res.data.url;
            }

            const payload = {
                order_id: doc?._id,
                media: media_type,
                from: "VENDOR",
                message: media_type === "TEXT" ? text : source,
            };

            const res = await AChat.Create(payload, token);

            if (res.success) {
                socket.emit("send:message", res.data);
                setMessages((p) => [...p, res.data]);
                resetMedia();
            } else {
                if (res.error?.includes("wallet")) {
                    dispatch({ type: "model", payload: [true, "wallet"] });
                }
                toast.error(res.error || res.message);
                resetMedia();
            }
        } catch (error) {
            toast.error(error?.message);
            resetMedia();
        }
    };

    const handleTyping = () => {
        socket.emit("typing", { from: user_id, to: remote_id });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) setImage(file);
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        chunksRef.current = [];

        recorder.ondataavailable = (e) => chunksRef.current.push(e.data);

        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            setAudio(new File([blob], "voice.webm"));
        };

        recorder.start();
        recorderRef.current = recorder;
        setRecording(true);
    };

    const stopRecording = () => {
        recorderRef.current?.stop();
        setRecording(false);
    };

    return (
        <div className="chat-app">
            <div ref={sidebarRef}>
                <Sidebar
                    docs={lib.chats_info}
                    toggle={sidebarOpen}
                    setToggle={setSidebarOpen}
                />
            </div>

            <main className={`chat-section ${sidebarOpen ? "sidebar-open" : ""}`}>
                <ChatHeader
                    typing={typing}
                    chat_info={lib.chat_info}
                    toggleSidebar={() => setSidebarOpen((s) => !s)}
                />

                <ChatMessages
                    messages={messages}
                    messageEndRef={messageEndRef}
                    typingStatus={typing}
                />

                {/* Media Preview */}
                <div>
                    {image && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(image)} alt="" />
                        </div>
                    )}

                    {audio && (
                        <div className="audio-preview">
                            <audio controls src={URL.createObjectURL(audio)} />
                        </div>
                    )}

                    {showEmoji && (
                        <EmojiPicker
                            onSelect={(emoji) => {
                                setText((t) => t + emoji);
                                setShowEmoji(false);
                            }}
                        />
                    )}
                </div>

                <ChatInput
                    text={text}
                    setText={setText}
                    handleTyping={handleTyping}
                    recording={recording}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    sendMessage={sendMessage}
                    handleImageUpload={handleImageUpload}
                    fileInputRef={fileInputRef}
                    setShowEmoji={setShowEmoji}
                    showEmoji={showEmoji}
                />
            </main>
        </div>
    );
}