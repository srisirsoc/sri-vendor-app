import React from 'react';

export default function PrivacyPolicy() {
    return (
        <section className="policy-page">
            <div className="policy-hero">
                <h1>Privacy Policy</h1>
                <p>
                    We respect your privacy and protect the information you share while using our service platform.
                    This policy explains what data we collect, how we use it, and how we keep it secure.
                </p>
            </div>

            <div className="policy-section">
                <h2>Information We Collect</h2>
                <p>
                    We collect information you provide when you create an account, request a service, communicate with providers,
                    or complete a booking. This may include your name, phone number, email, service preferences, payment details,
                    and messages exchanged through chat, voice, or video.
                </p>
            </div>

            <div className="policy-section">
                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To deliver services and connect you with qualified professionals.</li>
                    <li>To manage bookings, payments, and customer support requests.</li>
                    <li>To monitor service quality, detect fraud, and improve the platform.</li>
                    <li>To personalize your experience and provide relevant service recommendations.</li>
                </ul>
            </div>

            <div className="policy-section">
                <h2>Sharing and Disclosure</h2>
                <p>
                    We share your information with service providers only when necessary to fulfill your booking and
                    provide support. We do not sell your personal data to third parties. We may share information when required by law.
                </p>
            </div>

            <div className="policy-section">
                <h2>Cookies and Analytics</h2>
                <p>
                    We use cookies and similar technologies to improve site performance, understand how customers use the platform,
                    and maintain secure sessions. You can control cookie settings through your browser.
                </p>
            </div>

            <div className="policy-section">
                <h2>Security</h2>
                <p>
                    We implement reasonable security measures to protect your data from unauthorized access or disclosure.
                    However, no internet transmission is completely secure, so please use strong passwords and safeguard your account information.
                </p>
            </div>

            <div className="policy-section">
                <h2>Changes to This Policy</h2>
                <p>
                    We may update this policy as our platform evolves. We will post the latest version on this page with the effective date.
                    Continued use of the platform after changes means you accept the updated policy.
                </p>
            </div>
        </section>
    );
}
