import React, { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimesCircle,
    FaTimes,
} from "react-icons/fa";



const icons = {
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    warning: <FaExclamationTriangle />,
    info: <FaInfoCircle />,
};

const Toast = ({ message, type, duration, animation, delay, onClose, }) => {
    const [leave, setLeave] = useState(false);

    const close = () => {
        setLeave(true);
        setTimeout(onClose, 300);
    };

    useEffect(() => {
        const timer = setTimeout(close, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div
            className={`toast toast-${type} toast-anim-${animation} ${leave ? "toast-leave" : ""
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <span className="toast-icon">{icons[type]}</span>

            <span className="toast-msg">{message}</span>

            <button className="toast-close" onClick={close}>
                <FaTimes />
            </button>

            {/* Progress bar */}
            <div
                className="toast-progress"
                style={{
                    animationDuration: `${duration}ms`,
                    animationDelay: `${delay}ms`,
                }}
            />
        </div>
    );
};

export default Toast;
