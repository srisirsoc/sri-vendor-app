"use client";
import { FaPaperPlane, FaSmile, FaPaperclip, FaMicrophone } from "react-icons/fa";
import "./chat-input.css";
export default function ChatInput(props) {
  const { text, setText, handleTyping, recording, startRecording, stopRecording, sendMessage, handleImageUpload, fileInputRef, setShowEmoji, showEmoji } = props;
  return (
    <div className="chat-input-main">
      <div className="chat-input">
        <div className="input-icon">
          <button onClick={() => setShowEmoji((s) => !s)}><FaSmile /></button>
          <button onClick={() => fileInputRef.current.click()}><FaPaperclip /></button>
          <input hidden type="file" ref={fileInputRef} onChange={handleImageUpload} />
        </div>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={handleTyping}
        />

        {/* Right icons */}
        <div className="input-right">
          {!recording ? <button onClick={startRecording}><FaMicrophone /></button> : <button onClick={stopRecording} className="recording">⏹</button>}
          <button className="send-btn" onClick={sendMessage}><FaPaperPlane /></button>
        </div>
      </div>
    </div>
  );
}
