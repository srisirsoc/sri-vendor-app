"use client";

import "./breadcrumb.css";
import Container from "./container.card";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const formatLabel = (segment) => decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <Container>
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/" className="crumb home">
                    Home
                </Link>

                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

                    return (
                        <span key={href} className="crumb-wrapper">
                            <span className="separator">›</span>

                            {isLast ? (
                                <span className="crumb active">{formatLabel(segment)}</span>
                            ) : (
                                <Link to={href} className="crumb">
                                    {formatLabel(segment)}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </Container>
    );
}