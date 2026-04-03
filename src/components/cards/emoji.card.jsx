import EmojiList from "@/library/emoji.list";

export default function CustomEmojiPicker({ onSelect }) {
    return (
        <div className="custom-emoji-picker">
            {EmojiList.map((emoji, index) => (
                <button
                    key={index}
                    type="button"
                    className="emoji-btn"
                    onClick={() => onSelect(emoji.symbol)}
                    title={emoji.name}
                >
                    {emoji.symbol}
                </button>
            ))}
        </div>
    );
}