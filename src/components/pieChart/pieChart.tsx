import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import pieCss from './pieChart.module.scss'
import type { PieType } from '../../types/types';

const PieChartGraph = ({ pieRadiusSize, colorsArr, pieData, containerWidth, containerHeight }: PieType) => {

    // 1. pie data
    // 2. pie colors
    // 3. custom label function
    const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, value }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 35;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // custom color per name (overrides slice color)
        const labelColorMap = { React: '#3B82F6', Vue: '#10B981', Angular: '#F59E0B', Svelte: '#F97316' };
        const color = labelColorMap[name] || '#333';
        const fontSize = value >= 30 ? 13 : 12;
        const fontWeight = 'bold';

        return (
            <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fill={color} fontSize={fontSize} fontWeight={fontWeight} fontFamily="Inter, sans-serif">
                <tspan x={x} dy="-0.6em">{name}</tspan>
                <tspan x={x} dy="1.2em">{value}</tspan>
            </text>
        );
    };

    return (
        <ResponsiveContainer width={containerWidth} height={containerHeight}>
            <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={pieRadiusSize} fill="#8884d8" dataKey="value" label={renderCustomLabel}>
                    {pieData?.map((pieItem, index) => (
                        <Cell key={`cell-${index}`} fill={colorsArr[index % colorsArr.length]} />
                    ))}
                </Pie>
                <Tooltip />
                {/* <Legend /> */}
            </PieChart>
        </ResponsiveContainer >
    )
}

export default PieChartGraph