import EmojiList from "@/library/emoji.list";
import "./emoji-card.css"
export default function EmojiPicker({ onSelect }) {
    return (
        <div className="emoji-list">
            {EmojiList.map((emoji, index) => (
                <button
                    key={index}
                    type="button"
                    className="emoji-item"
                    onClick={() => onSelect(emoji.symbol)}
                    title={emoji.name}
                >
                    {emoji.symbol}
                </button>
            ))}
        </div>
    );
}