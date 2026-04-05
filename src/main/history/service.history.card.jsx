'use client';

import { useContext } from "react";
import "./service.history.card.css";
import { Context } from "../../store/store-provider";
import { ACall } from "../../actions/a.call";
import { AVCall } from "../../actions/a.vcall";

export default function OrderCompactCard({ item, type }) {
    if (!item) return null;
    const { state: { user }, dispatch } = useContext(Context);
    const { _id, id, amount = 0, createdAt, user: vendor = {}, status = "complete" } = item;
    const { name = "User", avatar = "/user.png", } = vendor;

    const columns = [
        { key: "status", title: "Status" },
        { key: "amount", title: "Amount", symbol: "₹ ", side: "front" },
        { key: "duration", title: "Duration", symbol: " Sec", side: "back" },
        { key: "createdAt", title: "Date", type: 'date' },
    ];

    const actions = {
        // view: (row) => alert(`View: ${JSON.stringify(row)}`),
        // edit: (row) => alert(`Edit: ${JSON.stringify(row)}`),
        // delete: (row) => alert(`Delete: ${JSON.stringify(row)}`),
    };

    let title = "Call Orders";
    async function GetServices(id) {
        let resp = { data: {}, success: false, error: "No data found", message: null };
        if (type == "CALL") {
            resp = await ACall.GetAll(`page=1&limit=100&order_id=${id}`, user.token);
        };
        if (type == "VCALL") {
            title = "Recent Video Calls"
            resp = await AVCall.GetAll(`page=1&limit=100&order_id=${id}`, user.token);
        };
        const { data, success } = resp;
        if (success && type != "CHAT") {
            dispatch({ type: "model", payload: [true, "global-table", { cols: columns, rows: data?.docs || [], actions: actions, title: title }] })
        };
        if (type == "CHAT") {
            dispatch({ type: "model", payload: [true, "chat-card", data?.docs] })
        };
    };
    const statusClass = status.toLowerCase();

    return (
        <>
            <div className="order-compact-card">
                <div className="order-compact-row">
                    <div className="order-compact-vendor">
                        <img
                            src={avatar}
                            alt={name}
                            className="order-compact-avatar"
                        />
                        <div className="order-compact-info">
                            <h4>{name}</h4>
                            <span className="order-compact-id">#{id || _id}</span>
                        </div>
                    </div>

                    <span className={`order-compact-status ${statusClass}`}>
                        {status.toUpperCase()}
                    </span>
                </div>

                <div className="order-compact-bottom">
                    <div>
                        <span>{type}</span>
                        &nbsp;|&nbsp;
                        <span className="order-compact-amount">₹{amount}</span>
                        &nbsp;|&nbsp;
                        <span className="order-compact-date">{ISTDate(createdAt)}</span>
                    </div>
                </div>
                <div>
                    <button className="order-compact-call-btn" onClick={() => GetServices(_id)} > View All</button>
                </div>
            </div>
        </>
    );
}
