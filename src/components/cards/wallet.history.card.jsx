import "./wallet.history.card.css";

export default function WalletHistoryCard({ item }) {
    if (!item) return null;

    const {
        service_type,
        amount,
        balance_before,
        balance_after,
        currency,
        createdAt,
    } = item;

    const formatDate = (date) => {
        if (!date) return "--";
        return new Date(date.$date || date).toLocaleString();
    };
    const isDebit = balance_before > balance_after;

    return (
        <div className="wallet-card">
            {/* Left indicator */}
            <div className={`wallet-indicator ${isDebit ? "debit" : "credit"}`} />

            <div className="wallet-content">
                {/* Header */}
                <div className="wallet-header">
                    <span className="wallet-service">{service_type}</span>
                    <span className={`wallet-amount ${isDebit ? "debit" : "credit"}`}>
                        {isDebit ? "-" : "+"}{currency} {amount}
                    </span>
                </div>

                {/* Date */}
                <div className="wallet-date">
                    {formatDate(createdAt)}
                </div>

                {/* Balances */}
                <div className="wallet-balance">
                    <span>
                        Before<br />
                        <strong>{currency} {balance_before}</strong>
                    </span>
                    <span>
                        After<br />
                        <strong>{currency} {balance_after}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
