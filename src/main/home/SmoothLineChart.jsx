"use client";

const SmoothLineChart = ({ data = [] }) => {
    const width = 600;
    const height = 200;
    const padding = 30;

    const maxValue = Math.max(...data.map(d => d.value));

    const getX = (i) =>
        padding + (i * (width - padding * 2)) / (data.length - 1);

    const getY = (value) =>
        height - padding - (value / maxValue) * (height - padding * 2);

    const points = data.map((d, i) => ({
        x: getX(i),
        y: getY(d.value),
    }));

    const pathD = points.reduce((acc, point, i, arr) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = arr[i - 1];
        const cx = (prev.x + point.x) / 2;
        return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, "");

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="svg-chart"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((p, i) => (
                <line
                    key={i}
                    x1={padding}
                    x2={width - padding}
                    y1={padding + p * (height - padding * 2)}
                    y2={padding + p * (height - padding * 2)}
                    stroke="#e5e7eb"
                    strokeDasharray="4"
                />
            ))}

            {/* Smooth line */}
            <path
                d={pathD}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                className="chart-path"
            />

            {/* Dots */}
            {points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#2563eb"
                />
            ))}
        </svg>
    );
};

export default SmoothLineChart;
