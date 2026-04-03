import React from 'react';

const services = [
    "Mechanic",
    "Painter",
    "Salon",
    "Teacher",
    "Driver",
    "Shop",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Cleaning",
    "Other"
];

export default function AboutPage() {
    return (
        <section className="about-page">
            <div className="about-hero">
                <h1>About Us</h1>
                <p>
                    We are the trusted platform that brings verified local and online service providers directly to you.
                    Whether you need a mechanic, electrician, tutor, beautician, driver or home service expert, we make it easy
                    to connect instantly by chat, voice call or video call.
                </p>
            </div>

            <div className="about-content">
                <div className="about-card">
                    <h2>What We Offer</h2>
                    <p>
                        Our platform helps busy people find fast, reliable support across everyday categories.
                        From home maintenance and repair to learning, wellness, transportation and shopping assistance,
                        our service network is built for convenience, safety and transparent pricing.
                    </p>
                </div>

                <div className="about-card">
                    <h2>How It Works</h2>
                    <ol>
                        <li>Browse verified providers in your category.</li>
                        <li>Choose chat, voice or video to contact them instantly.</li>
                        <li>Book your service, track progress, and pay securely.</li>
                    </ol>
                </div>

                <div className="about-card">
                    <h2>Why Choose Us</h2>
                    <ul>
                        <li>Verified service providers across multiple categories.</li>
                        <li>Instant access to help with chat, call, and video.</li>
                        <li>Easy booking, clear pricing, and secure payments.</li>
                        <li>Support for both local on-site work and remote consultations.</li>
                    </ul>
                </div>
            </div>

            <div className="service-list">
                <h2>Our Main Service Categories</h2>
                <div className="service-grid">
                    {services.map((name) => (
                        <div key={name} className="service-pill">
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-footer">
                <h2>Our Mission</h2>
                <p>
                    We believe every service request should be simple, fast and dependable. Our mission is to
                    connect people with the right professionals quickly, so daily life becomes easier and work
                    gets done with confidence.
                </p>
            </div>
        </section>
    );
}
