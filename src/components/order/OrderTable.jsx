"use client";
import React, { useState } from "react";
import OrderRow from "./OrderRow";
import Pagination from "./Pagination";
import OrderFilters from "./OrderFilters";
import OrderModal from "./OrderModal";
import "./order.css";

export default function OrderTable({ orders }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingRow, setEditingRow] = useState(null);

    const perPage = 8;

    // Filter + Search logic
    const filteredOrders = orders.filter((o) => {
        const matchesSearch =
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.user.name.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ? true : o.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const pageCount = Math.ceil(filteredOrders.length / perPage);
    const paginated = filteredOrders.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div className="order-wrapper">
            <OrderFilters
                search={search}
                onSearch={setSearch}
                status={statusFilter}
                setStatus={setStatusFilter}
            />

            <table className="order-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Service</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginated.map((order, i) => (
                        <OrderRow
                            key={order.id}
                            order={order}
                            index={(currentPage - 1) * perPage + i + 1}
                            onView={() => setSelectedOrder(order)}
                            editing={editingRow === order.id}
                            onEdit={() => setEditingRow(order.id)}
                            onSave={(updated) => {
                                Object.assign(order, updated);
                                setEditingRow(null);
                            }}
                            onCancel={() => setEditingRow(null)}
                        />
                    ))}
                </tbody>
            </table>

            <Pagination page={currentPage} setPage={setCurrentPage} total={pageCount} />

            {selectedOrder && (
                <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
}
