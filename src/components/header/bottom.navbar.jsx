"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { BiHomeAlt } from "react-icons/bi";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";

import "./bottom.navbar.css";

export default function BottomNavbar() {
    const pathname = usePathname();
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
                        setShowNavbar(false);
                    } else {
                        setShowNavbar(true);
                    }
                    lastScrollY.current = window.scrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`bottom-navbar ${showNavbar ? "show" : "hide"}`}>
            <Link
                href="/"
                className={`nav-item ${pathname === "/" ? "active" : ""}`}
            >
                <BiHomeAlt />
                <span>Home</span>
            </Link>

            <Link
                href="/chats"
                className={`nav-item ${pathname === "/chats" ? "active" : ""}`}
            >
                <RiMessage2Line />
                <span>Chats</span>
            </Link>

            <Link href="/v-calls" className="nav-item center-item">
                <BsCameraVideo />
            </Link>

            <Link
                href="/calls"
                className={`nav-item ${pathname === "/calls" ? "active" : ""}`}
            >
                <MdCall />
                <span>Calls</span>
            </Link>

            <Link
                href="/user"
                className={`nav-item ${pathname === "/user" ? "active" : ""}`}
            >
                <FiUser />
                <span>User</span>
            </Link>
        </nav>
    );
}
