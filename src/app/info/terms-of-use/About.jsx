import React from 'react';

export default function TermsOfUse() {
    return (
        <section className="policy-page">
            <div className="policy-hero">
                <h1>Terms and Conditions</h1>
                <p>
                    These terms govern your use of our platform for booking and communicating with service providers.
                    Please read them carefully before using the service.
                </p>
            </div>

            <div className="policy-section">
                <h2>Acceptance of Terms</h2>
                <p>
                    By using our platform, you agree to these terms and any additional policies posted on the site.
                    If you do not agree, please do not use the platform.
                </p>
            </div>

            <div className="policy-section">
                <h2>Services Offered</h2>
                <p>
                    We connect users with verified professionals for services such as home repair, tutoring, beauty, transportation,
                    and online consultations via chat, voice call, and video call.
                </p>
            </div>

            <div className="policy-section">
                <h2>User Responsibilities</h2>
                <ul>
                    <li>Provide accurate account and booking information.</li>
                    <li>Respect service providers and follow applicable laws.</li>
                    <li>Do not use the platform for fraudulent or abusive activity.</li>
                </ul>
            </div>

            <div className="policy-section">
                <h2>Payments and Cancellations</h2>
                <p>
                    Payments are processed through the platform. Cancellation and refund policies may vary by service provider.
                    We recommend reviewing provider-specific terms before confirming a booking.
                </p>
            </div>

            <div className="policy-section">
                <h2>Provider Verification</h2>
                <p>
                    We strive to work with verified providers, but we do not guarantee the quality or outcome of a service.
                    Users are responsible for selecting providers and reviewing available ratings and feedback.
                </p>
            </div>

            <div className="policy-section">
                <h2>Limitation of Liability</h2>
                <p>
                    Our platform is a facilitator for service connections. We are not liable for direct, indirect,
                    or consequential damages arising from the use of services booked through the platform.
                </p>
            </div>

            <div className="policy-section">
                <h2>Changes to Terms</h2>
                <p>
                    We may update these terms at any time. Continued use of the platform after changes signifies acceptance of the revised terms.
                </p>
            </div>
        </section>
    );
}
