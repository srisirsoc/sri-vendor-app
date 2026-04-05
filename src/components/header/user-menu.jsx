'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import "./user.menu.css";


import { Link, useNavigate } from 'react-router-dom';
import { UserNav, WithoutUserLinks } from '../../library/user.nav';
import { IconsReact, IconsText } from '../../library/icons';
import { Context } from '../../store/store-provider';
import { AVendor } from '../../actions/a.vendor';
import Actions from '../../store/actions';

const UserMenu = ({ setMenu }) => {
    const router = useNavigate();
    const { state: { user }, dispatch } = useContext(Context);


    const menuRef = useRef(null);
    const [focusIndex, setFocusIndex] = useState(0);

    const LogOutHandler = async () => {
        try {
            const { success, message, error } = await AVendor.Logout();
            if (success) {
                toast.success(message);
                dispatch({ type: Actions.user, payload: {} });
                localStorage.removeItem("token");
                location.replace("/");
                setMenu(false);
            } else {
                toast.error(error);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };
    const Login = () => {
        dispatch({ type: Actions.model, payload: [true, 'login'] });
        setMenu(false);
    };
    const menuItems = user?.vendor_id ? [...UserNav, { title: 'Logout', icon: IconsReact.Ban, onClick: LogOutHandler }]
        : [{ title: 'Login', icon: IconsReact.Login, onClick: Login }, ...WithoutUserLinks];

    /* Keyboard Navigation */
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current) return;

            if (e.key === 'Escape') setMenu(false);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusIndex((i) => Math.min(i + 1, menuItems.length - 1));
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusIndex((i) => Math.max(i - 1, 0));
            }

            if (e.key === 'Enter') {
                menuRef.current.children[focusIndex]?.click();
            }
        };

        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [focusIndex, menuItems.length, setMenu]);

    return (
        <>
            {/* Backdrop */}
            <div className="menu-backdrop" onClick={() => setMenu(false)} />
            <div className="user-menu-wrapper">
                <div className="user-menu-card" ref={menuRef}>
                    {/* User Summary */}
                    {user?.vendor_id && (
                        <div className="wallet-card">
                            <div className="wallet-info">
                                <div className="wallet-row">
                                    {IconsReact.Wallet}
                                    <span>{IconsText.Rupees}{user?.wallet?.balance || 0}</span>
                                </div>
                                <div className="wallet-row muted">
                                    {IconsReact.Info}
                                    <span>{user?.id || ""}</span>
                                </div>
                            </div>
                            <button className="wallet-btn" onClick={() => dispatch({ type: Actions.model, payload: [true, 'wallet'] })} >
                                {IconsReact.Wallet}
                                <span>Withdraw wallet</span>
                            </button>
                        </div>
                    )}

                    {menuItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item.link || '#'}
                            onClick={() => setMenu(false)}
                        >
                            <button
                                type="button"
                                className={`menu-item ${focusIndex === i ? 'active' : ''}`}
                                onClick={item.onClick}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.title}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserMenu;
