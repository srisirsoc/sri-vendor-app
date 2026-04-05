import React from "react";
import {
    FaWallet,
    FaHeart,
    FaEye,
    FaStar,
    FaComments,
    FaPhoneAlt,
    FaVideo
} from "react-icons/fa";
import "./profile.card.css";

const VendorDashboardCard = ({ vendor }) => {
    if (!vendor) return null;

    const {
        name,
        avatar,
        category,
        sub_category,
        city,
        state,
        is_online,
        is_chat_on,
        is_call_on,
        is_vcall_on,
        count,
        wallet
    } = vendor;

    return (
        <div className="v-card">
            {/* HEADER */}
            <div className="v-header">
                <div className="v-avatar-wrapper">
                    <img src={avatar} alt={name} className="v-avatar" />
                    <span className={`v-status-badge ${is_online ? "on" : "off"}`}></span>
                </div>

                <div className="v-info">
                    <h3 className="v-name">{name}</h3>
                    <p className="v-role">{category} • {sub_category}</p>
                    <p className="v-location">{city}, {state}</p>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="v-stat-grid">
                <StatCard type="wallet" icon={<FaWallet />} label="Wallet" value={`₹${wallet?.wallet ?? 0}`} />
                <StatCard type="likes" icon={<FaHeart />} label="Likes" value={count?.likes} />
                <StatCard type="views" icon={<FaEye />} label="Views" value={count?.views} />
                <StatCard type="ratings" icon={<FaStar />} label="Rating" value={count?.ratings} />
            </div>

            {/* ACTION BUTTONS */}
            <div className="v-actions-grid">
                <ActionButton icon={<FaComments />} label="Chat" active={is_chat_on} />
                <ActionButton icon={<FaPhoneAlt />} label="Call" active={is_call_on} />
                <ActionButton icon={<FaVideo />} label="Video Call" active={is_vcall_on} />
            </div>
        </div>
    );
};

/* STAT CARD COMPONENT */
const StatCard = ({ icon, label, value, type }) => (
    <div className={`v-stat-card gradient ${type}`}>
        <div className="v-stat-icon">{icon}</div>
        <div className="v-stat-text">
            <p className="v-stat-label">{label}</p>
            <h4 className="v-stat-value">{value ?? 0}</h4>
        </div>
    </div>
);

/* ACTION BUTTON COMPONENT */
const ActionButton = ({ icon, label, active }) => (
    <div className={`v-action-btn ${active ? "active" : "disabled"}`}>
        <div className="v-action-icon">{icon}</div>
        <span className="v-action-label">{label}</span>
    </div>
);

export default VendorDashboardCard;
