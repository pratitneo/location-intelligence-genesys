import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Commercial', value: 65 },
    { name: 'Residential', value: 35 },
];

const COLORS = ['#6FFFE9', '#FB7185'];

const DonutChart = () => {
    return (
        <div style={{ backgroundColor: '#6B21A8', padding: 20, borderRadius: 12, width: 240 }}>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    {/* Center Label */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={13}
                        fontWeight="bold"
                        fontFamily="Inter, sans-serif"
                    >
                        Neighborhood
                        <tspan x="50%" dy="1.2em">Commercial</tspan>
                        <tspan x="50%" dy="1.2em">Ratio</tspan>
                    </text>
                </PieChart>
            </ResponsiveContainer>

            {/* Legend below */}
            <div style={{ marginTop: 12, color: 'white', fontSize: 13, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <span style={{ color: '#6FFFE9' }}>●</span> Commercial
                        <br />
                        <strong>65%</strong>
                    </div>
                    <div>
                        <span style={{ color: '#FB7185' }}>●</span> Residential
                        <br />
                        <strong>35%</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
