"use client"
import "./support.css";
import { useState } from "react";

export function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setOpen(!open)}>
                <h4>{question}</h4>
                <span>{open ? "−" : "+"}</span>
            </div>

            {open && <p className="faq-answer">{answer}</p>}
        </div>
    );
}

export default function SupportPage() {
    return (
        <div className="support-page">
            {/* Hero */}
            <header className="support-hero">
                <h1>Support Center</h1>
                <p>We’re here to help you 24/7</p>

                <input
                    type="text"
                    placeholder="Search your issue..."
                    className="support-search"
                />
            </header>

            {/* Quick Help */}
            <section className="support-cards">
                <div className="help-card">
                    <h3>Account Issues</h3>
                    <p>Login, OTP & profile problems</p>
                </div>

                <div className="help-card">
                    <h3>Wallet & Payments</h3>
                    <p>Recharge, refunds & invoices</p>
                </div>

                <div className="help-card">
                    <h3>Calls & Chats</h3>
                    <p>Call not connecting or dropped</p>
                </div>

                <div className="help-card">
                    <h3>Astrologer Help</h3>
                    <p>Verification, earnings & services</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="support-faq">
                <h2>Frequently Asked Questions</h2>

                <FAQItem
                    question="How do I recharge my wallet?"
                    answer="Go to Wallet → Select amount → Complete payment."
                />
                <FAQItem
                    question="Why is my call not connecting?"
                    answer="Please check balance, availability, and internet connection."
                />
                <FAQItem
                    question="How do I contact support?"
                    answer="You can chat with us or email our support team anytime."
                />
            </section>

            {/* Contact */}
            <section className="support-contact">
                <h2>Still need help?</h2>
                <p>Talk to our friendly support team</p>

                <div className="contact-actions">
                    <button className="btn primary">Chat with Support</button>
                    <button className="btn outline">Email Support</button>
                </div>
            </section>
        </div>
    );
}
