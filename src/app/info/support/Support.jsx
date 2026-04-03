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
            <header className="support-hero">
                <h1>Support Center</h1>
                <p>
                    Need help with bookings, payments, or connecting with a service provider?
                    Our team is here to support you through every step of your service journey.
                </p>

                <input
                    type="text"
                    placeholder="Search your issue..."
                    className="support-search"
                />
            </header>

            <section className="support-cards">
                <div className="help-card">
                    <h3>Account & Login</h3>
                    <p>Help with signup, OTP verification, and profile updates.</p>
                </div>

                <div className="help-card">
                    <h3>Bookings & Scheduling</h3>
                    <p>Assistance with placing orders, provider selection, and rescheduling.</p>
                </div>

                <div className="help-card">
                    <h3>Payments & Wallet</h3>
                    <p>Support for recharges, refunds, invoices, and transaction issues.</p>
                </div>

                <div className="help-card">
                    <h3>Calls & Messages</h3>
                    <p>Fix chat, voice, and video connection issues quickly.</p>
                </div>

                <div className="help-card">
                    <h3>Provider Verification</h3>
                    <p>Questions about service provider profiles and verification status.</p>
                </div>
            </section>

            <section className="support-faq">
                <h2>Frequently Asked Questions</h2>

                <FAQItem
                    question="How do I book a service?"
                    answer="Choose a category, select a provider, and start the order with chat, call, or video. Follow the on-screen booking steps."
                />
                <FAQItem
                    question="What if my call does not connect?"
                    answer="Check your internet connection, confirm provider availability, and try again. If the issue continues, contact support."
                />
                <FAQItem
                    question="How can I request a refund?"
                    answer="Open the order details page and choose refund or cancellation if the provider allows it. Contact support if you need help."
                />
                <FAQItem
                    question="How do I update my profile information?"
                    answer="Go to your account settings, edit your profile details, and save changes. Ensure your contact details are current."
                />
            </section>

            <section className="support-contact">
                <h2>Still need help?</h2>
                <p>Contact our team for faster assistance with your service request.</p>

                <div className="contact-actions">
                    <button className="btn primary">Chat with Support</button>
                    <button className="btn outline">Email Support</button>
                </div>
            </section>
        </div>
    );
}
