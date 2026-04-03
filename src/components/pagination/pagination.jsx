"use client";
import React, { useContext } from "react";
import { IconsReact } from "../../library/icons";
import { useNavigate } from "react-router-dom";
import { Context } from "../state/store-provider";
import "./style.css";

const Pagination = ({ page = 1, next, prev, pages, url, limit = 10 }) => {
    const navigate = useNavigate();
    const { state: { screen } } = useContext(Context);

    const totalPages = Math.ceil(pages / limit);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    const handlePageChange = (p) => {
        if (p && p !== page) {
            navigate(`${url}&page=${p}`);
        }
    };

    return (
        <div className="pagination-main">
            <div className="pagination-wrapper">
                {/* Left Icon */}
                <div
                    className={`pagination-fixed pagination-left ${page === 1 ? "disabled" : ""}`}
                    onClick={() => handlePageChange(prev)}
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
                    onClick={() => handlePageChange(next)}
                >
                    {IconsReact.Right}
                </div>
            </div>
        </div>
    );
};
export default Pagination;
