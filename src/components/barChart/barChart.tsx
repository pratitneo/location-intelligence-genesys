import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const data = [
    { category: 'Luxury', value: 5 },
    { category: 'Premium', value: 25 },
    { category: 'Moderate', value: 40 },
    { category: 'Basic', value: 30 },
];

const gradientColor = ['#A5F3FC', '#0F172A']; // light to dark cyan

const BarChartGraph = () => {
    return (
        <div style={{ backgroundColor: '#6B21A8', borderRadius: 12, padding: 16, width: 360 }}>
            <h4 style={{ color: 'white', marginBottom: 16 }}>Branded Outlet Distribution</h4>

            <ResponsiveContainer width="100%" height={160}>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="category"
                        tick={{ fill: 'white', fontSize: 14 }}
                        width={90}
                    />

                    <Bar dataKey="value" barSize={16} radius={[20, 20, 20, 20]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill="url(#cyanGradient)"
                            />
                        ))}
                        {/* Label on right */}
                        <text
                            x="100%"
                            y={0}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fill="white"
                        />
                    </Bar>
                    <defs>
                        <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#67E8F9" />
                            <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>

            {/* Right-aligned % values */}
            <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 90 }}>
                {data.map((d, i) => (
                    <div key={d.category} style={{ display: 'flex', justifyContent: 'space-between', color: 'cyan', fontWeight: 600 }}>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ minWidth: 30, textAlign: 'right', color: '#5EEAD4' }}>{d.value}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChartGraph;
