"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Navs } from "@/library/user.nav";
import { IconsReact } from "@/library/icons";
import { Context } from "../state/store-provider";
import Container from "../cards/container.card";
import UserMenu from "./user-menu";
import NavMenu from "./nav-menu";

import { AUser } from "@/actions/a.user";
import AStore from "@/actions/a.store";

import "./header.style.css";

const Header = ({ language = "ENGLISH" }) => {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);
    const { user, screen = [], cart = { items: [] } } = state;

    const [menu, setMenu] = useState(false);
    const [nav, setNav] = useState(false);
    const [lang, setLang] = useState(language);

    const isDesktop = screen?.[0] > 500;
    const name = user?.name?.split(" ")[0] || "User";
    const getScreenSize = () => typeof window !== "undefined" ? [window.innerWidth, window.innerHeight] : [0, 0];
    useEffect(() => {
        dispatch({ type: AStore.cart, payload: {} });
        const handleResize = () => dispatch({ type: AStore.screen, payload: getScreenSize() });
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    const MenuHandler = async (type, value) => {
        switch (type) {
            case "user":
                setMenu((prev) => !prev);
                setNav(false);
                break;

            case "nav":
                setNav((prev) => !prev);
                setMenu(false);
                break;

            case "leave":
                setMenu(false);
                setNav(false);
                break;

            case "lng":
                if (!value) return;
                const { success } = await AUser.Session({ language: value });
                if (success) {
                    toast.success("Language changed successfully!");
                    setLang(value);
                    router.push("/");
                    router.refresh();
                }
                break;

            default:
                break;
        }
    };

    return (
        <nav className="header-nav" onMouseLeave={() => MenuHandler("leave")}>
            <Container>
                <div className="relative">
                    <div className="header-container">
                        {/* LEFT */}
                        <div className="header-left">
                            <Link href="/" className="logo">
                                Srisir
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="header-right">
                            {isDesktop && (
                                <div className="nav-links">
                                    {Navs.map((item, i) => (
                                        <Link
                                            key={i}
                                            href={item.link || "/"}
                                            className="nav-link"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {!user?.vendor_id && (
                                <button
                                    className="mobile-menu-btn"
                                    onClick={() => MenuHandler("user")}
                                >
                                    {IconsReact.Menu}
                                </button>
                            )}

                            {user?.vendor_id && (
                                <div
                                    className="user-avatar-wrapper"
                                    onClick={() => MenuHandler("user")}
                                >
                                    {cart?.items?.length > 0 && (
                                        <span className="cart-badge">
                                            {cart?.items?.length || 0}
                                        </span>
                                    )}
                                    <div className="user-avatar">
                                        {user.avatar ? <img src={user.avatar} alt={name[0]} /> : name[0]}
                                    </div>
                                    <span className="user-name">{name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {menu && <UserMenu setMenu={setMenu} />}
                </div>
            </Container>

            {nav && <NavMenu MenuHandler={MenuHandler} />}
        </nav>
    );
};

export default Header;
