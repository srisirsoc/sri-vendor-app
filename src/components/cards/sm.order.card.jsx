"use client"
import React, { useState } from "react";
import "./sm.order.card.css";

const OrderCard = ({ order = {} }) => {
    const [open, setOpen] = useState(false);
    // return null
    const { amount, duration, type, status, start_at, user, vendor } = order;
    const createdDate = new Date(start_at?.$date || start_at).toLocaleString();

    return (
        <>
            {/* Small Order Card */}
            <div className="order-card">
                <div className="order-left">
                    <img
                        src={vendor?.avatar}
                        alt="vendor"
                        className="order-avatar"
                    />

                    <div>
                        <h4>{vendor?.name}</h4>
                        <p className="order-type">{type} • {duration}s</p>
                        <p className="order-date">{createdDate}</p>
                    </div>
                </div>

                <div className="order-right">
                    <span className={`order-status ${status.toLowerCase()}`}>
                        {status}
                    </span>
                    <h3>₹{amount}</h3>
                    <button className="view-btn" onClick={() => setOpen(true)}>
                        View Details
                    </button>
                </div>
            </div>

            {/* Popup */}
            {open && (
                <div className="modal-backdrop" onClick={() => setOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Order Details</h3>

                        <div className="modal-row">
                            <strong>Vendor:</strong> {vendor?.name}
                        </div>

                        <div className="modal-row">
                            <strong>Service Type:</strong> {type}
                        </div>

                        <div className="modal-row">
                            <strong>Duration:</strong> {duration} seconds
                        </div>

                        <div className="modal-row">
                            <strong>Amount:</strong> ₹{amount}
                        </div>

                        <div className="modal-row">
                            <strong>Status:</strong>
                            <span className={`order-status ${status.toLowerCase()}`}>
                                {status}
                            </span>
                        </div>

                        <div className="modal-row">
                            <strong>User Phone:</strong> {user?.phone}
                        </div>

                        <div className="modal-row">
                            <strong>Created At:</strong> {createdDate}
                        </div>

                        <button className="close-btn" onClick={() => setOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderCard;
