'use client';
import './otp.verify.form.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Context } from '../../store/store-provider';
import { useNavigate } from 'react-router-dom';
import Actions from '../../store/actions';
import { AVendor } from '../../actions/a.vendor';

const OTP_LENGTH = 4;
const RESEND_TIME = 30;

const OtpVerifyModal = () => {
    const router = useNavigate();
    const { state: { model, data, loading }, dispatch } = useContext(Context);

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(RESEND_TIME);
    const [shake, setShake] = useState(false);

    const inputRefs = useRef([]);
    const isOpen = model?.[0] && model?.[1] === "verify";

    /* Modal open lifecycle */
    useEffect(() => {
        if (!isOpen) return;
        setOtp(Array(OTP_LENGTH).fill(""));
        setTimer(RESEND_TIME);
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
        return () => clearInterval(interval);
    }, [isOpen]);

    /* Input change */
    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    /* Backspace handling */
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    /* Shake animation */
    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 450);
    };


    const SubmitHandler = async () => {
        const code = otp.join("");
        if (code.length !== OTP_LENGTH) {
            triggerShake();
            toast.error("Enter complete OTP");
            return;
        }

        try {
            dispatch({ type: Actions.loading, payload: true });
            const { success, message, data: D, error } = await AVendor.Verify({ phone: data.phone, otp: code });

            if (success) {
                const info = { token: D.token, vendor_id: D._id, language: "ENGLISH", ...D }
                dispatch({ type: Actions.user, payload: info });
                dispatch({ type: Actions.token, payload: info.token });
                localStorage.setItem("token", info.token);
                toast.success("Login successful!");
                dispatch({ type: Actions.loading, payload: false });
            } else {
                triggerShake();
                dispatch({ type: Actions.loading, payload: false });
                toast.error(error || message || "OTP verification failed");
            }
        } catch (err) {
            console.error('OTP verify submit error:', err);
            triggerShake();
            dispatch({ type: Actions.loading, payload: false });
            toast.error(err.message || "Something went wrong!");
        }
    };

    const resendOtp = async () => {
        try {
            setTimer(RESEND_TIME);
            await AVendor.Login(data.phone);
            toast.success("OTP resent");
        } catch {
            toast.error("Failed to resend OTP");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="otp-overlay">
            <div className={`otp-modal ${shake ? "shake" : ""}`}>
                <h3>Verify OTP</h3>
                <p>Sent to +91 {data.phone}</p>

                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => inputRefs.current[index] = el}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <button
                    className="verify-btn"
                    onClick={SubmitHandler}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="resend">
                    {timer > 0 ? (
                        <span>Resend OTP in <b>{timer}s</b></span>
                    ) : (
                        <button onClick={resendOtp}>Resend OTP</button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default React.memo(OtpVerifyModal);
