"use client";

export default function Error({ error, reset }) {
    console.error(error); // logs full error in console for debugging

    return (
        <div style={{ padding: "1.5rem", maxWidth: "600px", margin: "2rem auto", border: "1px solid #e5e7eb", borderRadius: "12px", backgroundColor: "#fff" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#ef4444" }}>
                Something went wrong
            </h2>

            {/* Show real error message */}
            <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                {error?.message || "Unknown error occurred."}
            </p>

            <button
                onClick={() => reset()}
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "0.2s",
                    border: "none"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#111827"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#1f2937"}
            >
                Retry
            </button>

            {/* Optional: full stack for dev */}
            {import.meta.env.DEV && error?.stack && (
                <pre style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#111827", overflowX: "auto" }}>
                    {error.stack}
                </pre>
            )}
        </div>
    );
}
