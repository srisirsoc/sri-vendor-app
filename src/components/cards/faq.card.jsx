"use client";
import React, { useState } from 'react';
import './FaqCard.css'; // Import the CSS

const FaqCard = ({ question, answer, index }) => {
    const [faq, setFaq] = useState([false, ""]);

    const toggleFaq = () => {
        setFaq([!faq[0], index]);
    };

    return (
        <div className="faq-card-container">
            <div
                className="faq-card-header"
                onClick={toggleFaq}
            >
                <p>{question}</p>
            </div>
            <div className={`faq-card-answer ${faq[0] && faq[1] === index ? 'open' : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FaqCard;

const FaqSection = () => {
    const faqs = [
        { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
        { question: 'How do I use React?', answer: 'To use React, you need to install it and create components that define your UI.' },
        { question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript that looks similar to HTML, used with React.' }
    ];

    return (
        <div>
            {faqs.map((faq, index) => (
                <FaqCard
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                />
            ))}
        </div>
    );
};

export { FaqSection };
