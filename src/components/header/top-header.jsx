"use client";
import React from "react";
import Container from "../cards/container.card";
import "./top.header.css"
import { IconsReact } from "../../library/icons";
const TopHeader = () => {
    return (
        <div className="top-header-modern">
            <Container>
                <div className="top-header-modern-inner">
                    {/* Left Section */}
                    <div className="top-header-modern-left">
                        <div className="top-header-modern-item">
                            <span className="icon">{IconsReact.Email}</span>
                            <span className="text">info@srisir.com</span>
                        </div>
                        <div className="top-header-modern-item">
                            <span className="icon">{IconsReact.Phone}</span>
                            <span className="text">+91-9304-44-6350</span>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="top-header-modern-right">
                        <div className="top-header-modern-item">
                            <span className="icon">{IconsReact.Whatsapp}</span>
                            <span className="text">Whatsapp Channel</span>
                        </div>
                        <div className="top-header-modern-item">
                            <span className="icon">{IconsReact.Eye}</span>
                            <span className="text">Telegram Group</span>
                        </div>
                        <div className="top-header-modern-social">
                            <span className="icon">{IconsReact.Linkedin}</span>
                            <span className="icon">{IconsReact.Facebook}</span>
                            <span className="icon">{IconsReact.Twitter}</span>
                            <span className="icon">{IconsReact.Info}</span>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TopHeader;
