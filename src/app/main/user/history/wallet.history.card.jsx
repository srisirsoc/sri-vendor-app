import { ISTDate } from "@/library/dates";
import "./wallet.history.card.css";

export default function WalletHistoryCard({ item }) {
    if (!item) return null;
    const { type, amount, before, after, currency, createdAt } = item;
    const isDebit = before > after;

    return (
        <div className="wallet-card">
            {/* Left indicator */}
            <div className={`wallet-indicator ${isDebit ? "debit" : "credit"}`} />

            <div className="wallet-content">
                {/* Header */}
                <div className="wallet-header">
                    <span className="wallet-service">{type}</span>
                    <span className={`wallet-amount ${isDebit ? "debit" : "credit"}`}>
                        {isDebit ? "-" : "+"}{currency} {amount}
                    </span>
                </div>

                {/* Date */}
                <div className="wallet-date">
                    {ISTDate(createdAt)}
                </div>

                {/* Balances */}
                <div className="wallet-balance">
                    <span>
                        Before<br />
                        <strong>{currency} {before}</strong>
                    </span>
                    <span>
                        After<br />
                        <strong>{currency} {after}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
