"use client";
import React, { useContext } from 'react';
import './user-profile.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/store-provider';
import { IconsReact } from '../../library/icons';

const reviews = [
    {
        _id: "1",
        user: { name: "Rahul Sharma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg" },
        rating: 5,
        comment: "Very professional and quick service.",
        createdAt: "2025-01-02"
    },
    {
        _id: "4",
        user: { name: "Rahul Sharma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg" },
        rating: 5,
        comment: "Very professional and quick service.",
        createdAt: "2025-01-02"
    },
    {
        _id: "5",
        user: { name: "Rahul Sharma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/0.jpg" },
        rating: 5,
        comment: "Very professional and quick service.",
        createdAt: "2025-01-02"
    }
];
const comments = [
    {
        _id: "1",
        user: { name: "Aman Verma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg" },
        message: "Very helpful and polite!",
        createdAt: "2025-01-10"
    },
    {
        _id: "2",
        user: { name: "Aman Verma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg" },
        message: "Very helpful and polite!",
        createdAt: "2025-01-10"
    },
    {
        _id: "3",
        user: { name: "Aman Verma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg" },
        message: "Very helpful and polite!",
        createdAt: "2025-01-10"
    }
];

const giftOrders = [
    {
        id: "GFT001",
        status: "PENDING",
        gift: { id: "GIF001", icon: "🎁", name: "Birthday Surprise", amount: 500 },
        user: { id: "U001", name: "Aman Verma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg" },
        vendor: { id: "V001", name: "Pankaj Kumar", avatar: "/avatars/vendor1.jpg" }
    },
    {
        id: "GFT002",
        status: "DELIVERED",
        gift: { id: "GIF002", icon: "💐", name: "Flower Bouquet", amount: 300 },
        user: { id: "U002", name: "Sneha Sharma", avatar: "https://xsgames.co/randomusers/assets/avatars/male/9.jpg" },
        vendor: { id: "V002", name: "Ravi Singh", avatar: "/avatars/vendor2.jpg" }
    },
    {
        id: "GFT003",
        status: "CANCELLED",
        gift: { id: "GIF003", icon: "🍫", name: "Chocolate Box", amount: 250 },
        user: { id: "U003", name: "Rahul Mehta", avatar: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg" },
        vendor: { id: "V003", name: "Anjali Rao", avatar: "/avatars/vendor3.jpg" }
    }
];

const ServiceDetailsCard = ({ lib }) => {
    const navigate = useNavigate();
    const { state: { user }, dispatch } = useContext(Context);
    const [preview, setPreview] = React.useState(null);
    const [tab, setTab] = React.useState("ratings");
    const x = lib?.doc || {};

    function Handler(type, id) {
        const isTab = type === "ratings" || type === "comments" || type === "gifts";

        if (!user?.vendor_id && !isTab) {
            dispatch({ type: AStore.model, payload: [true, "login"] });
            return;
        }

        const d = { ...x };
        switch (type) {
            case "call":
                d.type = 'Call';
                d.icon = IconsReact.Call;
                dispatch({ type: AStore.model, payload: [true, "order_connection_card", d] });
                break;
            case "chat":
                d.type = 'Chat';
                d.icon = IconsReact.Chat;
                dispatch({ type: AStore.model, payload: [true, "order_connection_card", d] });
                break;
            case "v-call":
                d.type = 'VCall';
                d.icon = IconsReact.Video;
                dispatch({ type: AStore.model, payload: [true, "order_connection_card", d] });
                break;
            case "gift":
                d.type = 'Gift';
                d.icon = IconsReact.Gift;
                dispatch({ type: AStore.model, payload: [true, "order_connection_card", d] });
                break;
            case "edit":
                navigate(`/user/${x?._id}`);
                break;
            case "ratings":
            case "comments":
            case "gifts":
                dispatch({ type: AStore.model, payload: [true, type, x] });
                break;
            default:
                break;
        }
    }

    // return null;
    const about = x?.about || {};
    // const cost = x?.pricing[0] || {};
    const count = x?.count || {};
    const location = x?.location || {};

    return (
        <div className="sd-card-modern">
            {/* Header */}
            <div className="sd-header-modern">
                <div className="sd-avatar-modern cp" onClick={() => Handler("details", x._id)}>
                    <img src={x?.avatar} alt={about?.name} />
                </div>
                <div className="sd-info-modern">
                    <h2 className="sd-name-modern cp" onClick={() => Handler("details", x._id)}>
                        {about?.name}
                    </h2>
                    <div className="sd-badges-modern">
                        <span className="badge">{IconsReact.Location} {location?.state}, {location?.country}</span>
                        <span className="badge">{IconsReact.Star} {count?.ratings}</span>
                        <span className="badge">{IconsReact.Like} {count?.likes}</span>
                        <span className="badge">{IconsReact.Share} {count?.shares}</span>
                    </div>
                    <div className="sd-cta-modern">
                        <button className="btn-gradient" onClick={() => Handler("edit", x._id)}>{IconsReact.Gift} Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="sd-description-modern">
                <p className="sd-about-text">{about?.description}</p>

                <div className="sd-tags-modern">
                    {/* Languages */}
                    <div className="sd-info-block">
                        <p className="sd-info-title">
                            {IconsReact.Language} Languages
                        </p>
                        <div className="sd-chip-list">
                            <span className="sd-chip">{about?.languages}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="sd-info-block">
                        <p className="sd-info-title">Skills</p>

                        {x?.skills?.map((skill, i) => (
                            <div className="sd-item-card" key={i}>
                                <div className="sd-item-header">
                                    <span className="sd-item-title">{skill?.title}</span>
                                    <span className="sd-item-level">{skill?.level}</span>
                                </div>

                                <p className="sd-item-desc">{skill?.description}</p>

                                <span className="sd-item-exp">
                                    Experience: {skill?.experience} yrs
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Specialities */}
                    <div className="sd-info-block">
                        <p className="sd-info-title">Specialities</p>

                        {x?.specialities?.map((sp, i) => (
                            <div className="sd-item-card" key={i}>
                                <span className="sd-item-title">{sp?.title}</span>
                                <p className="sd-item-desc">{sp?.description}</p>
                                <span className="sd-item-exp">
                                    Experience: {sp?.experience} yrs
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="sd-tabs-modern">
                <button
                    className={tab === "ratings" ? "active" : ""}
                    onClick={() => setTab("ratings")}
                >
                    {IconsReact.Star}
                    <span>Reviews</span>
                </button>

                <button
                    className={tab === "comments" ? "active" : ""}
                    onClick={() => setTab("comments")}
                >
                    {IconsReact.Chat}
                    <span>Comments</span>
                </button>

                <button
                    className={tab === "gifts" ? "active" : ""}
                    onClick={() => setTab("gifts")}
                >
                    {IconsReact.Gift}
                    <span>Gifts</span>
                </button>
            </div>

            <div className="sd-tab-content-modern">
                {tab === "ratings" && (
                    <div className="sd-reviews-wrapper">
                        {reviews?.length ? (
                            reviews.map(r => (
                                <div className="sd-review-card" key={r?._id}>
                                    <div className="sd-review-header">
                                        <img
                                            src={r?.user?.avatar || "/avatar.png"}
                                            className="sd-review-avatar"
                                        />
                                        <div>
                                            <p className="sd-review-name">{r?.user?.name}</p>
                                            <div className="sd-review-stars">
                                                {"★".repeat(r?.rating)}
                                                {"☆".repeat(5 - r?.rating)}
                                            </div>
                                        </div>
                                        <span className="sd-review-date">
                                            {r?.createdAt}
                                        </span>
                                    </div>

                                    <p className="sd-review-text">{r?.comment}</p>
                                </div>
                            ))
                        ) : (
                            <EmptyState title="No ratings found!" />
                        )}
                    </div>
                )}
                {tab === "comments" && (
                    <div className="sd-comments-wrapper">
                        {comments?.length ? (
                            comments?.map(c => (
                                <div className="sd-comment-card" key={c?._id}>
                                    <img
                                        src={c?.user?.avatar || "/avatar.png"}
                                        className="sd-comment-avatar"
                                    />

                                    <div className="sd-comment-body">
                                        <div className="sd-comment-header">
                                            <span className="sd-comment-name">{c?.user?.name}</span>
                                            <span className="sd-comment-date"> {c?.createdAt} </span>
                                        </div>
                                        <p className="sd-comment-text">{c?.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (<EmptyState title="No comments found!" />)}
                    </div>
                )}
                {/* Gift Tab */}
                {tab === "gifts" && (
                    giftOrders?.length > 0 ? (
                        <div className="sd-gifts-wrapper">
                            {giftOrders.map(order => (
                                <div className="sd-gift-card" key={order?.id}>
                                    <div className="sd-gift-icon">{order?.gift?.icon}</div>
                                    <div className="sd-gift-info">
                                        <h3 className="sd-gift-name">{order?.user?.name}</h3>
                                        <div className="sd-gift-details">
                                            <span className="sd-gift-amount">₹{order?.gift?.amount}</span>
                                            <span className={`sd-gift-status ${order?.status?.toLowerCase()}`}>{order?.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="No gifts found!" />
                    )
                )}
            </div>

            <div>
                <div className="sd-gallery-modern">
                    {lib?.gallery?.map((img, i) => (
                        <div
                            className="sd-gallery-item-modern"
                            key={i}
                            onClick={() => setPreview(`/gallery/${img}`)}
                        >
                            <img src={`/gallery/${img}`} alt={img} />
                        </div>
                    ))}
                    {preview && (
                        <div className="sd-lightbox" onClick={() => setPreview(null)}>
                            <img src={preview} className="sd-lightbox-img" />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ServiceDetailsCard;
