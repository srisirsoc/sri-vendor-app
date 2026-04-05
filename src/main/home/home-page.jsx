"use client";
import { useEffect, useState } from "react";
import "./home-page.css";
import ProfileDetailsCard from "./profile.card"
import SmoothLineChart from "./SmoothLineChart";

const stats = [
    { label: "Total Orders", value: 1240, accent: "blue" },
    { label: "Call Orders", value: 320, accent: "green" },
    { label: "Chat Orders", value: 540, accent: "purple" },
    { label: "Video Calls", value: 148, accent: "red" },
];

const VendorDashboard = ({ lib }) => {
    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        stats.forEach((s, i) => {
            let current = 0;
            const step = Math.ceil(s.value / 40);
            const interval = setInterval(() => {
                current += step;
                if (current >= s.value) {
                    current = s.value;
                    clearInterval(interval);
                }
                setCounts(prev => {
                    const copy = [...prev];
                    copy[i] = current;
                    return copy;
                });
            }, 20);
        });
    }, []);

    const chartData = [
        { label: "Jan", value: 300 },
        { label: "Feb", value: 450 },
        { label: "Mar", value: 520 },
        { label: "Apr", value: 680 },
        { label: "May", value: 820 },
        { label: "A", value: 420 },
        { label: "B", value: 820 },
        { label: "C", value: 820 },
        { label: "D", value: 400 },
        { label: "E", value: 820 },
        { label: "F", value: 10 },
    ];

    return (
        <div className="dash-wrap">
            <br />
            <ProfileDetailsCard vendor={lib?.doc} />
            <br />
            {/* KPI Cards */}
            <section className="kpi-grid">
                {stats.map((item, i) => (
                    <div key={item.label} className="kpi-card">
                        <span className={`kpi-dot ${item.accent}`} />
                        <p className="kpi-label">{item.label}</p>
                        <h2 className="kpi-value">{counts[i]}</h2>
                    </div>
                ))}
            </section>
            <br />
            <section className="chart-card">
                <h3>Revenue Trend</h3>
                <SmoothLineChart data={chartData} />
            </section>

            {/* Chart + Summary */}
            <section className="chart-grid">
                <div className="chart-card">
                    <h3>Revenue Trend</h3>
                    <div className="line-chart">
                        <span style={{ height: "30%" }} />
                        <span style={{ height: "42%" }} />
                        <span style={{ height: "55%" }} />
                        <span style={{ height: "72%" }} />
                        <span style={{ height: "85%" }} />
                    </div>
                </div>
                <div className="summary-card">
                    <h3>Overview</h3>
                    <ul>
                        <li>Total Revenue <strong>$24,000</strong></li>
                        <li>Active Orders <strong>76</strong></li>
                        <li>Pending <strong>12</strong></li>
                        <li>Completion Rate <strong>92%</strong></li>
                    </ul>
                </div>
            </section>

            {/* Orders Table */}
            <section className="table-card">
                <h3>Recent Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#2101</td>
                            <td>Rahul</td>
                            <td><span className="status success">Completed</span></td>
                            <td>$240</td>
                        </tr>
                        <tr>
                            <td>#2102</td>
                            <td>Ankit</td>
                            <td><span className="status pending">Pending</span></td>
                            <td>$120</td>
                        </tr>
                        <tr>
                            <td>#2103</td>
                            <td>Neha</td>
                            <td><span className="status failed">Cancelled</span></td>
                            <td>$80</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default VendorDashboard;
