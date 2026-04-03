import React from "react";
import "./payment.css";

const PaymentFailed = () => {
  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-icon failed">✖</div>

        <h1 className="payment-title">Payment Failed</h1>

        <p className="payment-message">
          Unfortunately, your payment could not be completed.
          <br />
          Please try again or contact support.
        </p>
        <a href="/" className="payment-btn btn-failed">
          Go to homepage
        </a>
      </div>
    </div>
  );
};
export default PaymentFailed;
