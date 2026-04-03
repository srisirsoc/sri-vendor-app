"use client";
import React from 'react';
import toast from 'react-hot-toast';
// const base = `https://api.mchacha.com/mchacha`;
// const modules = `order`;

const base = `http://localhost:5000`;
const modules = `wallet-order`;

const create_api = `${base}/api/v1/${modules}/razorpay/create`;
const verify_api = `${base}/api/v1/${modules}/razorpay/verify`;

const RazorPay = ({ order_id }) => {

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {

        const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!isLoaded) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        const orderResponse = await fetch(create_api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: order_id }), // ₹500
        });

        const { success, data, error, message } = await orderResponse.json();
        
        if (!success) throw new Error(error || message);
        const { order = {}, payment = {} } = data;

        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: order.payable_amt,
            currency: order.currency,
            name: "SriSir Pvt. Ltd.",
            description: "Test Transaction",
            order_id: payment.id,
            handler: async function (response) {
                const verifyResponse = await fetch(`${verify_api}/${order_id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...response, order_id: order_id }),
                });

                const { success, data } = await verifyResponse.json();
                if (success) {
                    toast.success("Payment Verified Successfully ✅");
                } else {
                    toast.error("Payment Verification Failed ❌");
                }
            },
            prefill: {
                name: "Srikant",
                email: "srisir@gmail.com",
                contact: "9911950502",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Razorpay Payment Integration</h2>
            <br />
            <button style={{ background: "red", padding: "10px", cursor: "pointer" }} onClick={handlePayment}>
                Pay ₹500
            </button>
        </div>
    );
};

export default RazorPay;