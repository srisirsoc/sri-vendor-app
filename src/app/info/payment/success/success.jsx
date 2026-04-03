import React from "react";
import "./payment.css";
const PaymentSuccess = () => {
    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-icon success">✔</div>

                <h1 className="payment-title">Payment Successful</h1>

                <p className="payment-message">
                    Thank you! Your payment has been processed successfully.
                    <br />
                    Your wallet has been updated.
                </p>

                <a href="/" className="payment-btn btn-success">
                    Go to homepage
                </a>
            </div>
        </div>
    );
};
export default PaymentSuccess;
