'use client';

import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./global.table.css";
import EmptyState from "./empty-state.card";
import { ISTDate } from "../../library/dates";

export default function GlobalTable({ data }) {
    if (!data) return;
    const { cols = [{ key: "", title: "" }], rows = [], actions = {}, title } = data;
    if (!cols.length || !rows.length) return <EmptyState title="No records found!" subtitle={null} goback={false} reload={false} />;
    return (
        <div className="table-container">
            {title && <h2>{title}</h2>}
            <table className="global-table">
                <thead>
                    <tr>
                        <th>#</th>
                        {cols.map((col, idx) => (<th key={idx}>{col.title}</th>))}
                        {Object.keys(actions).length > 0 && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{rowIndex + 1}</td>
                            {cols.map((col, colIndex) => {

                                const value = row[col.key] ?? "-";

                                if (col.key === "status") {
                                    const statusClass = (value || "").toLowerCase();
                                    return (<td key={colIndex}><span className={`status-badge ${statusClass}`}>{value}</span></td>);
                                }

                                return (
                                    <td key={colIndex}>
                                        {col?.side == "front" && col?.symbol}
                                        {col.type == "date" ? ISTDate(value) : value}
                                        {col.side == "back" && col?.symbol}
                                    </td>
                                );
                            })}

                            {Object.keys(actions).length > 0 && (
                                <td className="actions-column">
                                    {actions.view && (
                                        <button
                                            className="table-icon-btn view"
                                            onClick={() => actions.view(row)}
                                            title="View"
                                        >
                                            <AiOutlineEye size={18} />
                                        </button>
                                    )}
                                    {actions.edit && (
                                        <button
                                            className="table-icon-btn edit"
                                            onClick={() => actions.edit(row)}
                                            title="Edit"
                                        >
                                            <AiOutlineEdit size={18} />
                                        </button>
                                    )}
                                    {actions.delete && (
                                        <button
                                            className="table-icon-btn delete"
                                            onClick={() => actions.delete(row)}
                                            title="Delete"
                                        >
                                            <AiOutlineDelete size={18} />
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
