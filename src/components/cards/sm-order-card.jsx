import React from "react";
import "./sm-order-card.css";
import { ACall } from "@/actions/a.call";
import { AVCall } from "@/actions/a.vcall";
import toast from "react-hot-toast";

const SmOrderToast = ({ data: order, token }) => {
    if (!order) return null;
    const { type, status, _id } = order;
    const onResume = async () => {
        if (type == "CALL") {
            location.replace(`/calls/${_id}`);
        };
        if (type == "VCALL") {
            location.replace(`/v-calls/${_id}`);
        };
    };
    const onTerminate = async () => {
        let q = { success: false, data: null, error: "No data found", message: null };
        if (type == "CALL") {
            q = await ACall.Update(_id, { field: "status:cancelled", data: {} }, token);
        };
        if (type == "VCALL") {
            q = await AVCall.Update(_id, { field: "status:cancelled", data: {} }, token);
        };
        const { success, data, error, message } = q;
        if (success) {
            toast.success(message);
            location.replace(`/`);
        } else {
            toast.error(error || message)
        };
    };
    return (
        <div className="sm-toast">
            <div className="sm-toast-content">
                <p>
                    An existing <span className="">{type}</span> session is active on your account. Please end it to continue.
                    {/* There is an active <span className="">{type}</span> in progress. Kindly close or terminate it before proceeding. */}
                </p>
            </div>

            <div className="sm-toast-actions">
                {status != "PENDING" &&
                    <button className="sm-toast-btn resume" onClick={() => onResume(order)} > Resume</button>
                }
                <button className="sm-toast-btn terminate" onClick={() => onTerminate(order)} > End {type} </button>
            </div>
        </div>
    );
};

export default SmOrderToast;
