import MessageBubble from "./message-bubble";
import "./chat-message.css"

export default function ChatMessages({ messages, typingStatus, messageEndRef }) {
  return (
    <div className="chat-messages">
      {messages.map((m, i) => (
        <MessageBubble key={i} m={m} />
      ))}
      {typingStatus && <MessageBubble isTyping />}
      <div ref={messageEndRef} />
    </div>
  );
}
