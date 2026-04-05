"use client";

import {
    FaTimes,
    FaSearch,
    FaStar,
    FaThumbsUp,
    FaShare
} from "react-icons/fa";
import "./sidebar.css"
import { IconsReact } from "../../library/icons";
import { Link } from "react-router-dom";

export default function Sidebar({ docs = [], toggle, setToggle }) {

    return (
        <aside className={`sidebar ${toggle ? "open" : ""}`}>
            {/* Header */}
            <div className="sidebar-header">
                <h3>Chats</h3>
                <div className="back-button-c">
                    <Link to={"/"} className="back-button">
                        {IconsReact.Logout}
                    </Link>
                    <FaTimes className="close-icon" onClick={() => setToggle(false)} />
                </div>
            </div>

            {/* Search */}
            <div className="sidebar-search">
                <FaSearch />
                <input placeholder="Search or start new chat" />
            </div>

            {/* Chat List */}
            {docs.length > 0 ? (
                <div className="sidebar-users">
                    {docs.map((chat, i) => {
                        const user = chat?.user || {};
                        return (
                            <Link
                                to={`/chats/${chat?._id}`}
                                key={i}
                                className="sidebar-user"
                            >
                                <img
                                    src={user?.avatar || "/user.png"}
                                    alt="avatar"
                                    className="avatar"
                                />

                                <div className="user-content">
                                    <div className="user-top">
                                        <h4>{user.name || "Unknown"}</h4>
                                        <span className="price">
                                            ₹{user.wallet || 0}
                                        </span>
                                    </div>

                                    <p className="last-message">
                                        {chat?.last_message || "Start a conversation"}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (<p className="no-data">No chat list found!</p>)}
        </aside>
    );
}
