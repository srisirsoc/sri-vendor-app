"use client";
import React, { useState } from "react";
export default function OrderRow({ order, index, onView, onEdit, onSave, onCancel, editing, }) {
    const [editData, setEditData] = useState(order);

    const update = (field, value) => {
        setEditData({ ...editData, [field]: value });
    };

    return (
        <tr>
            <td>{index}</td>
            <td>{order.id}</td>

            {/* User */}
            <td>
                <div className="user-cell">
                    {order?.user?.avatar ? <img src={order?.user?.avatar} className="avatar" /> : <img src={"/user.png"} className="avatar" />}
                    <div>{order.user.name}</div>
                </div>
            </td>

            {/* Vendor */}
            <td>
                <div className="user-cell">
                    {order?.vendor?.avatar ? <img src={order?.vendor?.avatar} className="avatar" /> : <img src={"/user.png"} className="avatar" />}
                    <p>{order.vendor.name}</p>
                </div>
            </td>

            {/* Amount */}
            <td>
                {editing ? (
                    <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) => update("amount", e.target.value)}
                    />
                ) : (
                    `₹${order.amount}`
                )}
            </td>

            {/* Status */}
            <td>
                {editing ? (
                    <select
                        value={editData.status}
                        onChange={(e) => update("status", e.target.value)}
                    >
                        <option>pending</option>
                        <option>completed</option>
                        <option>cancelled</option>
                    </select>
                ) : (
                    <span className={`status-badge ${order.status}`}>
                        {order.status}
                    </span>
                )}
            </td>

            <td>{order.service?.title || "-"}</td>
            <td>{order?.duration} sec</td>

            {/* Action Icons */}
            <td className="action-buttons">
                {!editing ? (
                    <>
                        <button onClick={onView}>👁</button>
                        <button onClick={onEdit}>✏️</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onSave(editData)}>✔️</button>
                        <button onClick={onCancel}>❌</button>
                    </>
                )}
            </td>
        </tr>
    );
}
