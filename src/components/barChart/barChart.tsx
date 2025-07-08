import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import DrpdwnHead from '../drpdwnHead/drpdwnHead';
import barCss from './barChart.module.scss'
import type { CustomBarType } from '../../types/types';

const data = [
    { category: 'Luxury', value: 25 },
    { category: 'Premium', value: 50 },
    { category: 'Moderate', value: 75 },
    { category: 'Basic', value: 100 },
];

// Custom shape for a single row (with background + foreground)
const CustomBar = ({ x, y, width, height, payload, bgBarColor, barColor, barNumColor }: any) => {
    const barHeight = height * 2.5;
    const centerY = y + (height - barHeight) / 2;
    const fillWidth = (payload.value / 100) * width;

    return (
        <g>
            {/* Background track */}
            <rect x={x} y={centerY} width={width} height={barHeight} rx={barHeight / 2} fill={bgBarColor} />

            {/* Filled bar */}
            <rect x={x} y={centerY} width={fillWidth} height={barHeight} rx={barHeight / 2} fill={barColor} />

            {/* Consistent percentage label outside */}
            <text x={x + width + 12} y={y + height / 2 + 4} fontSize={18} fontWeight={600} fill={barNumColor} textAnchor="start">{payload.value}%</text>
        </g>
    );
};



const BarChartGraph = ({ getBarColor, getNumColor, barBgColor }: CustomBarType) => {
    return (
        <div className={`${barCss['lip-bar__wrap']}`}>
            <DrpdwnHead heading='branded outlet distribution' customCls='radar-chart' />
            <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" data={data} barCategoryGap={20} margin={{ left: 0, right: 60 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} tick={{ fill: 'white', fontSize: 14 }} width={80} />
                    <Bar dataKey="value" shape={<CustomBar barColor={getBarColor} barNumColor={getNumColor} bgBarColor={barBgColor} />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartGraph;
