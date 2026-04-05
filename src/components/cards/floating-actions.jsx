'use client';

import { FaWhatsapp } from "react-icons/fa";
import "./floating-actions.css";

const FloatingWhatsapp = () => {
    const phoneNumber = "919911950502";
    const message = encodeURIComponent(
        "Hello, I would like to know more about your services."
    );

    return (
        <a
            to={`https://wa.me/${phoneNumber}?text=${message}`}
            className="floating-whatsapp pulse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="wa-icon" />

            {/* Tooltip */}
            <span className="wa-tooltip">Chat with us</span>
        </a>
    );
};

export default FloatingWhatsapp;
