import Models from "./model";
import React, { useContext } from 'react';
import "./style.css";
import LoginForm from "../forms/login.form";
import VerifyOtpForm from "../forms/otp.verify.form";
import ShareWithPeople from "../cards/share-with-people.card";
import IncomingCallCard from "../call/incomming.call.card";
import { Context } from "../state/store-provider";
import IncomingVideoCall from "../vcall/vcall.incomming";
import GlobalTable from "../cards/global-table";
import ChatHistoryCard from "../cards/chat.history.card";
import SmOrderCard from "../cards/sm-order-card";
const ModelType = () => {
    const { state: { model, user } } = useContext(Context);
    if (!model[0]) return null;
    const data = model[2] || {};
    return (
        <>
            <Models width={420} model_type={"login"}>
                <LoginForm />
            </Models>
            <Models width={400} model_type={"verify"}>
                <VerifyOtpForm />
            </Models>
            <Models width={464} model_type={"social"}>
                <ShareWithPeople />
            </Models>
            <Models width={464} model_type={"call-incomming-card"}>
                <IncomingCallCard order={data} token={user?.token} />
            </Models>
            <Models width={464} model_type={"vcall-incomming-card"}>
                <IncomingVideoCall order={data} token={user?.token} />
            </Models>

            <Models width={1200} model_type={"global-table"}>
                <GlobalTable data={data} token={user?.token} />
            </Models>

            <Models width={1200} model_type={"chat-card"}>
                <ChatHistoryCard data={data} token={user?.token} />
            </Models>

            <Models width={500} model_type={"sm-order-card"}>
                <SmOrderCard data={data} token={user?.token} />
            </Models>
        </>
    )
}
export default React.memo(ModelType);