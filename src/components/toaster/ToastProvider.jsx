"use client";
import React from "react";
import { ToastProvider, useToast } from "./ToastContext";
import "./toast.css";

const Demo = () => {
    const { addToast } = useToast();

    return (
        <div style={{ padding: 40 }}>
            <button onClick={() => addToast("Success!", "success", 4000, "bounce")}>
                Success (bounce)
            </button>

            <button onClick={() => addToast("Warning!", "warning", 5000, "fade")}>
                Warning (fade)
            </button>

            <button onClick={() => addToast("Error occurred!", "error", 3500, "slide")}>
                Error (slide)
            </button>

            <button onClick={() => addToast("Info message", "info", 4500, "fade")}>
                Info (fade)
            </button>
        </div>
    );
};

export default function NewToastApp() {
    return (
        <ToastProvider position="top-right" maxToasts={5} animation="slide" stagger={150} >
            <Demo />
        </ToastProvider>
    );
}
