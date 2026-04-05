"use client";
import React from 'react';
import { AOrder } from '@/actions/a.order';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import "./incomming.orders.card.css"

const IncommingOrdersCard = ({ lib }) => {
    const router = useRouter();
    const order = lib?.orders?.[0] || {};
    async function Handler(type, id) {
        try {
            switch (type) {
                case "accept": lib.order = await AOrder.Update(id, { field: "status:ongoing", data: {} }, lib.token); break;
                case "reject": lib.order = await AOrder.Update(id, { field: "status:cancelled", data: {} }, lib.token); break;
                default: break;
            };
            const { success, data, error, message } = lib?.order || { success: false, data: null, error: "", message: "" };
            if (success) {
                toast.success(message);
                if (data?.status == "ONGOING") {
                    if (data?.type == "CALL") router.push(`/calls/${data?._id}`);
                    if (data?.type == "CHAT") router.push(`/chats/${data?._id}`);
                    if (data?.type == "VCALL") router.push(`/vcalls/${data?._id}`);
                } else {
                    router.refresh();
                }
            } else {
                toast.error(error || message);
            }
        } catch (error) {
            toast.error(error?.message);
        };
    }
    return (
        <>
            <div className="incoming-call-modal">
                <div className="ring-animation">U</div>
                <h3>{order?.user?.name || "User"} is calling…</h3>
                <div className="actions">
                    <button className="accept" onClick={() => Handler("accept", order?._id)}>Accept</button>
                    <button className="reject" onClick={() => Handler("reject", order?._id)}>Reject</button>
                </div>
            </div>
        </>
    )
};
export default IncommingOrdersCard;