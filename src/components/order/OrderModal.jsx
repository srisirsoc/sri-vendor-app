import React from "react";
import "./order.css";

export default function OrderModal({ order, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Order Details</h2>

                <div className="modal-content">
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>Amount:</b> ₹{order.amount}</p>
                    <p><b>Status:</b> {order.status}</p>

                    <hr />

                    <h3>User</h3>
                    <p>{order.user.name}</p>
                    <p>{order.user.phone}</p>

                    <h3>Vendor</h3>
                    <p>{order.vendor.name}</p>

                    <h3>Service</h3>
                    <p>{order.service?.title}</p>

                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
