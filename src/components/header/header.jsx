import "./header.style.css";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "../cards/container.card";
import UserMenu from "./user-menu";
import NavMenu from "./nav-menu";
import { Context } from "../../store/store-provider";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { IconsReact } from '../../library/icons';
import Actions from "../../store/actions";
import { AVendor } from "../../actions/a.vendor";
import { Navs } from "../../library/user.nav";

const Header = () => {
    const router = useNavigate();
    const { state, dispatch } = useContext(Context);
    const { user, screen = [], cart = { items: [] } } = state;

    const [menu, setMenu] = useState(false);
    const [nav, setNav] = useState(false);

    const isDesktop = screen?.[0] > 500;
    const name = user?.name?.split(" ")[0] || "User";
    const getScreenSize = () => typeof window !== "undefined" ? [window.innerWidth, window.innerHeight] : [0, 0];
    useEffect(() => {
        dispatch({ type: Actions.cart, payload: {} });
        const handleResize = () => dispatch({ type: Actions.screen, payload: getScreenSize() });
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
                const { success } = await AVendor.Session({ language: value });
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
                            <Link to="/" className="logo">
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
                                            to={item.link || "/"}
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
