"use client";
import React, { useContext } from "react";
import { IconsReact } from "../../library/icons";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/store-provider";

const Pagination = ({ page = 1, pages = 1, url, limit = 10 }) => {
    const navigate = useNavigate();
    const { state: { screen } } = useContext(Context);

    const totalPages = Math.ceil(pages / limit);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    const prevPage = page > 1 ? page - 1 : 1;
    const nextPage = page < totalPages ? page + 1 : totalPages;

    const getPageUrl = (p) => {
        if (!url.includes("?")) return `${url}?page=${p}`;
        return `${url}&page=${p}`;
    };

    const handlePageChange = (p) => {
        if (p && p !== page) {
            navigate(getPageUrl(p));
        }
    };

    return (
        <div className="pagination-main">
            <div className="pagination-wrapper">
                {/* Left Icon */}
                <div
                    className={`pagination-fixed pagination-left ${page === 1 ? "disabled" : ""}`}
                    onClick={() => handlePageChange(prevPage)}
                >
                    {IconsReact.Left}
                </div>

                {/* Scrollable Page Numbers */}
                <ul className="pagination-list">
                    {pageNumbers.map((p) => (
                        <li
                            key={p}
                            className={`pagination-item ${p === page ? "active" : ""}`}
                            onClick={() => handlePageChange(p)}
                        >
                            {p}
                        </li>
                    ))}
                </ul>

                {/* Right Icon */}
                <div
                    className={`pagination-fixed pagination-right ${page === totalPages ? "disabled" : ""}`}
                    onClick={() => handlePageChange(nextPage)}
                >
                    {IconsReact.Right}
                </div>
            </div>
        </div>
    );
};

export default Pagination;