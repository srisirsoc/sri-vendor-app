'use client';

import Script from "next/script";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoChatbubbleOutline, IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import Container from "./container.card";
import "./footer.css";
import { useContext, useEffect } from "react";
import { Context } from "../state/store-provider";
import { ACall } from "@/actions/a.call";
import { AVCall } from "@/actions/a.vcall";

const Footer = () => {
    const { state: { user }, dispatch } = useContext(Context);
    const id = user?.vendor_id || null;
    const q = `page=1&limit=1&vendor_id=${id}&status=PENDING:ONGOING`;
    async function GetOrders() {
        if (!id || !user?.token) return;
        const [c, v] = await Promise.all([ACall.GetAll(q, user.token), AVCall.GetAll(q, user.token)]);
        if (c?.success && c?.data?.docs?.[0]) {
            const doc = c?.data?.docs?.[0] || {};
            dispatch({ type: "model", payload: [true, 'sm-order-card', { ...doc, type: "CALL", token: user.token }] });
        };
        if (v?.success && v.data?.docs?.[0]) {
            const doc = v?.data?.docs?.[0] || {};
            dispatch({ type: "model", payload: [true, 'sm-order-card', { ...doc, type: "VCALL" }] });
        };
    };
    useEffect(() => {
        if (!id || !user?.token) return;
        GetOrders();
    }, [id]);

    return (
        <footer className="light-footer">

            <Script
            // id="razorpay-checkout-js"
            // src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Container>
                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-col">
                        <img src="/images/home.svg" alt="Logo" className="footer-logo" />
                        <p className="footer-desc">
                            Build modern digital solutions with chat, call & video call services.
                        </p>

                        <div className="footer-social">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaLinkedinIn /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaTwitter /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-list">
                            <li><a href="/">Home</a></li>
                            <li><a href="/#about">About</a></li>
                            <li><a href="/#features">Features</a></li>
                            <li><a href="/#blog">Blog</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul className="footer-list icon-list">
                            <li>
                                <IoChatbubbleOutline />
                                <a href="/chats">Live Chat</a>
                            </li>
                            <li>
                                <IoCallOutline />
                                <a href="/calls">Voice Call</a>
                            </li>
                            <li>
                                <IoVideocamOutline />
                                <a href="/v-calls">Video Call</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Other Outlet */}
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul className="footer-list icon-list">
                            <li>
                                <FaEnvelope />
                                <span>support@srisir.com</span>
                            </li>
                            <li>
                                <FaPhoneAlt />
                                <span>+91 930444 6350</span>
                            </li>
                            <li>
                                <FaMapMarkerAlt />
                                <span>India</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Srisir. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};
export default Footer;
