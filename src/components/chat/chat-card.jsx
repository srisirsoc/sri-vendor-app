"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-message";
import ChatInput from "./chat-input";
import { useRouter } from "next/navigation";
import { socket } from "@/library/socket.client";
import EmojiPicker from "./emoji.card";
import toast from "react-hot-toast";
import { UploadFileWithProgress } from "@/library/upload.file";
import "./chat-card.css";
import { AChat } from "@/actions/a.chat";
import { Context } from "../state/store-provider";

let refresh_count = 0;
export default function ChatCard({ lib }) {
    const { dispatch } = useContext(Context);
    const msgs = lib.messages || [];
    const router = useRouter();
    const doc = lib?.chat_info || {};
    const [messages, setMessages] = useState(msgs);
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

    const user_id = doc?.vendor_id;
    const remote_id = doc?.user_id;
    const token = lib?.token || null;

    useEffect(() => {
        if (!user_id || !remote_id) return;

        socket.emit("chat-room", { room_id: user_id });
        // socket.on("chat-joined", (d) => console.log(d, '....'));

        socket.on("message:sended", msg => {
            setMessages(prev => [...prev, msg]);
            socket.emit("seen", msg.id);
            if (refresh_count > 5) {
                refresh_count = 0;
                router.refresh();
            } else {
                refresh_count += 1;
            };
        });

        socket.on("typing", ({ from }) => {
            if (from === remote_id) {
                setTyping(true);
                setTimeout(() => setTyping(false), 800);
            }
        });

        socket.on("delivered", id => {
            setMessages(p => p.map(m => m.id === id ? { ...m, delivered: true } : m));
        });

        socket.on("seen_update", id => {
            setMessages(p => p.map(m => m.id === id ? { ...m, seen: true } : m));
        });

    }, [user_id, remote_id]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(event) { if (sidebarRef.current && !sidebarRef.current.contains(event.target)) { setSidebarOpen(false) } };
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside) };
    }, []);

    const sendMessage = async () => {
        if (!text && !image && !audio) return;
        let media_type = "TEXT";
        let source = null;
        try {
            if (image) {
                const { success, data, error, message } = await UploadFileWithProgress(image, token, setUploadProgress);
                if (success) {
                    media_type = "IMAGE";
                    source = data.url;
                } else {
                    toast.error(error || message);
                }
            };
            if (audio) {
                const { success, data, error, message } = await UploadFileWithProgress(audio, token, setUploadProgress);
                if (success) {
                    media_type = "AUDIO";
                    source = data.url;
                } else {
                    toast.error(error || message);
                }
            };
            const payload = { order_id: doc?._id, media: media_type, from: "VENDOR" };
            if (media_type === "TEXT") {
                payload.message = text;
            } else {
                payload.message = source;
            };
            const { success, data, error, message } = await AChat.Create(payload, token);
            if (success) {
                socket.emit("send:message", data);
                setMessages(p => [...p, data]);
                setText("");
                setImage(null);
                setAudio(null);
                setUploadProgress(0);
            } else {
                if (error.includes("wallet")) {
                    dispatch({ type: "model", payload: [true, 'wallet'] })
                }
                toast.error(error || message)
                setText("");
                setImage(null);
                setAudio(null);
                setUploadProgress(0);
            }
        } catch (error) {
            toast.error(error?.message)
            setUploadProgress(0);
            setText("");
            setImage(null);
            setAudio(null);
            setUploadProgress(0);
        }
    };

    const handleTyping = () => {
        socket.emit("typing", { from: user_id, to: remote_id });
    };

    const handleImageUpload = e => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        chunksRef.current = [];
        recorder.ondataavailable = e => chunksRef.current.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            const audioFile = new File([blob], "voice.webm", { type: "audio/webm" });
            setAudio(audioFile);
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
                <Sidebar docs={lib.chats_info} toggle={sidebarOpen} setToggle={setSidebarOpen} />
            </div>
            <main className={`chat-section ${sidebarOpen ? "sidebar-open" : ""}`}>
                <ChatHeader typing={typing} chat_info={lib.chat_info} toggleSidebar={() => setSidebarOpen(s => !s)} />
                <ChatMessages messages={messages || []} messageEndRef={messageEndRef} typingStatus={typing} />
                <div>
                    {image && (
                        <div className="image-preview">
                            <img src={URL?.createObjectURL(image)} />
                            {uploadProgress > 0 && (
                                <div className="upload-progress">
                                    <div className="bar" style={{ width: `${uploadProgress}%` }} />
                                    <span>{uploadProgress}%</span>
                                </div>
                            )}
                        </div>
                    )}
                    {audio && (
                        <div className="audio-preview">
                            <audio controls src={URL.createObjectURL(audio)} />
                            {uploadProgress > 0 && (
                                <div className="upload-progress">
                                    <div className="bar" style={{ width: `${uploadProgress}%` }} />
                                    <span>{uploadProgress}%</span>
                                </div>
                            )}
                        </div>
                    )}
                    {showEmoji && (<div className="audio-preview"><EmojiPicker onSelect={(emoji) => { setText((t) => t + emoji); setShowEmoji(false); }} /></div>)}
                </div>
                < ChatInput
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
