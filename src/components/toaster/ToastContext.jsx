import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext(undefined);

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
};

export const ToastProvider = ({ children, position = "top-right", maxToasts = 4, animation = "slide", stagger = 120, }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((message, type = "info", duration = 3500, anim = animation) => {
        const id = Date.now();

        const delay = toasts.length * stagger;
        const newToast = { id, message, type, duration, animation: anim, delay };
        setToasts((prev) => {
            const updated = [...prev, newToast];
            return updated.slice(-maxToasts);
        });

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration + delay);
    },
        [animation, maxToasts, stagger, toasts.length]
    );

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div className={`toast-container toast-pos-${position}`}>
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        {...t}
                        onClose={() =>
                            setToasts((prev) => prev.filter((x) => x.id !== t.id))
                        }
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
