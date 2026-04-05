"use client";
import React, { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../header/header";
import TopHeader from "../header/top-header";
import BottomNavbar from "../header/bottom.navbar";
import NewMessagePopup from "../cards/notification.card";
import ModelType from "../models/model-type";
import { useNavigate, useLocation } from "react-router-dom";
import { useNewMessage } from "../../hooks/chat/useNewMessage";
import { Context } from "../../store/store-provider";
import Actions from "../../store/actions";
import { AVendor } from "../../actions/a.vendor";

const LAYOUT_HIDE_PATHS = ["calls/", "chats/", "vcalls/"];

const Layout = ({ children }) => {
    const router = useNavigate();
    const location = useLocation(); // <-- Fixed: get current path
    const [session, setSession] = useState({});
    const { popup, setPopup } = useNewMessage();
    const [toggle, setToggle] = useState(true);
    const language = "ENGLISH";
    const { state, dispatch } = useContext(Context);
    const user = state?.user || {};

    const Session = async () => {
        if (user?.vendor_id && user?.token) return;

        if (session?.vendor_id) {
            await AVendor.Session({
                token: session.token,
                user_id: session?.vendor_id || null,
                language,
            });
            dispatch({ type: Actions.token, payload: session.token });
            dispatch({ type: Actions.user, payload: session });
            localStorage.setItem("token", session.token);
        } else {
            const token = localStorage.getItem("token");

            if (token) {
                const { success, data } = await AVendor.IsAuth(token);
                if (success && data?.vendor_id) {
                    await AVendor.Session({
                        token,
                        user_id: data.vendor_id,
                        language,
                    });
                    const n = { ...data, token };
                    dispatch({ type: Actions.token, payload: token });
                    dispatch({ type: Actions.user, payload: n });
                    setSession(n);
                } else {
                    await AVendor.Logout();
                    localStorage.removeItem("token");
                    location.replace("/");
                }
            }
        }
    };

    useEffect(() => {
        // Hide layout on certain paths
        const hideLayout = LAYOUT_HIDE_PATHS.some((path) =>
            location.pathname.includes(path)
        );
        setToggle(!hideLayout);

        Session();
    }, [location.pathname]); // <-- re-run whenever path changes

    useEffect(() => {
        // Show login modal if user not logged in
        if (!user?.vendor_id) {
            dispatch({ type: Actions.model, payload: [true, "login", null, true] });
        } else {
            dispatch({ type: Actions.model, payload: [false, null] });
        }
    }, [user?.vendor_id]);

    if (!user?.vendor_id || !user?.token) return <ModelType />;

    return (
        <>
            {toggle && (
                <>
                    <TopHeader />
                    <header className="header">
                        <Header language={language} mainMenu={{}} />
                    </header>
                    <BottomNavbar />
                </>
            )}

            <main className="min-h-[80vh]">{children}</main>

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
                        router(`/chats/${popup?.chatId}`);
                        setPopup(null);
                    }}
                />
            )}
        </>
    );
};

export default Layout;