"use client";
import React, { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/header";
import TopHeader from "../header/top-header";
import BottomNavbar from "../header/bottom.navbar";
import Footer from "../cards/footer.card";
import NewMessagePopup from "../cards/notification.card";
import ModelType from "../models/model-type";
import { useNewMessage } from "@/hooks/chat/useNewMessage";
import { Context } from "../state/store-provider";
import { AUser } from "@/actions/a.user";
import Actions from "../state/actions";
import { AVendor } from "@/actions/a.vendor";
const LAYOUT_HIDE_PATHS = ["calls/", "chats/", "v-calls/"];

const Layout = ({ children, lib }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [session, setSession] = useState({ ...lib?.user });
    const { popup, setPopup } = useNewMessage();
    const [toggle, setToggle] = useState(true);
    const language = lib?.language || "ENGLISH";

    const { state: { user }, dispatch } = useContext(Context);

    const Session = async () => {

        if (user?.vendor_id && user?.token) return;

        if (session?.vendor_id) {

            dispatch({ type: Actions.token, payload: session.token });
            dispatch({ type: Actions.user, payload: session });
            await AVendor.Session({ token: session.token, user_id: session?.vendor_id || null, language: "ENGLISH" });
            localStorage.setItem("token", session.token);

        } else {

            const token = localStorage.getItem("token");

            if (token) {

                const { success, message, error, data } = await AVendor.IsAuth(token);
                if (success && data?.vendor_id) {
                    await AUser.Session({ token: token, user_id: data?.vendor_id || null, language: "ENGLISH" });
                    location.reload();
                } else {
                    await AVendor.Logout();
                    localStorage.removeItem("token");
                    location.replace('/');
                }

            };

        };
    };

    useEffect(() => {
        const hideLayout = LAYOUT_HIDE_PATHS.some((url) => pathname.includes(url));
        setToggle(!hideLayout);
        Session();
    }, [pathname]);

    useEffect(() => {
        !user?.vendor_id ? dispatch({ type: Actions.model, payload: [true, "login", null, true] }) : dispatch({ type: Actions.model, payload: [false, null] });
    }, [user?.vendor_id]);

    if (!user?.vendor_id || !user?.token) return <ModelType />;

    return (
        <>
            {toggle && (
                <>
                    <TopHeader user={user} />
                    <header className="header">
                        <Header language={language} mainMenu={{}} />
                    </header>
                    <BottomNavbar />
                </>
            )}

            <main className="min-h-[80vh]">{children}</main>

            {toggle && <Footer />}
            <Toaster />
            <ModelType />
            
            {popup && (
                <NewMessagePopup
                    open={!!popup}
                    sender={popup?.sender}
                    message={popup?.message}
                    avatar={popup?.avatar}
                    chatId={popup?.chatId}
                    media={popup?.media}
                    autoClose={5000}
                    sound={true}
                    onClose={() => setPopup(null)}
                    onOpenChat={() => {
                        navigate(`/chats/${popup?.chatId}`);
                        setPopup(null);
                    }}
                />
            )}
        </>
    );
};

export default Layout;
