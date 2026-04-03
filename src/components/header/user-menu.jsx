'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import "./user.menu.css";

import { UserNav, WithoutUserLinks } from '@/library/user.nav';
import { IconsReact, IconsText } from '@/library/icons';
import { Context } from '../state/store-provider';
import { AUser } from '@/actions/a.user';
import AStore from '@/actions/a.store';

const UserMenu = ({ setMenu }) => {
    const router = useRouter();
    const { state: { user }, dispatch } = useContext(Context);

    const menuRef = useRef(null);
    const [focusIndex, setFocusIndex] = useState(0);

    const LogOutHandler = async () => {
        try {
            const { success, message, error } = await AUser.Logout();
            if (success) {
                toast.success(message);
                dispatch({ type: AStore.user, payload: {} });
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
        dispatch({ type: AStore.model, payload: [true, 'login'] });
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
                                    <span>{user?.id||""}</span>
                                </div>
                            </div>
                            <button className="wallet-btn" onClick={() => dispatch({ type: AStore.model, payload: [true, 'wallet'] })} >
                                {IconsReact.Wallet}
                                <span>Withdraw wallet</span>
                            </button>
                        </div>
                    )}

                    {menuItems.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link || '#'}
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
