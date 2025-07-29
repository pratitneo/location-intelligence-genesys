import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import donutCss from './donutChart.module.scss'
import type { DonutItemType, DonutType } from '../../types/types';


const DonutChart = ({ boxHeight, donutData, inRadiusVal, outRadiusVal, numberDataKey, colors, pieCenterTextColor, chartTextOne, chartTextTwo }: DonutType) => {
    return (
        <div className={`${donutCss['lip-donut__wrap']}`}>
            <ResponsiveContainer width="100%" height={boxHeight}>
                <PieChart>
                    <Pie data={donutData} cx="50%" cy="50%" innerRadius={inRadiusVal} outerRadius={outRadiusVal} dataKey={numberDataKey}>
                        {donutData?.map((_entry: DonutItemType, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>

                    {/* Center Label */}
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className={donutCss['lip-donut__chartText']} fill={pieCenterTextColor}>
                        <tspan x="50%" dy="-0.6em">{chartTextOne}</tspan>
                        <tspan x="50%" dy="1.2em">{chartTextTwo}</tspan>
                    </text>
                </PieChart>
            </ResponsiveContainer>

            {/* Legend below */}
            <div className={`${donutCss['lip-donut__legendWrap']}`}>
                {donutData?.map((data, index) => {
                    return (
                        <div key={index} className={`${donutCss['lip-donut__legend']}`}>
                            <span style={{ color: data?.colorName }}>●</span><span style={{ color: data?.colorName }}>{data?.name}</span><span style={{ color: data?.colorName }}>{data?.value}%</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DonutChart;
