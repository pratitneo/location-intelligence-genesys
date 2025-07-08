import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Dot, Legend } from 'recharts';
import lineChartCss from './lineChart.module.scss'
import type { LineBtnType, LineChartType } from '../../types/types';
import LineChartBtns from '../lineChartBtns/lineChartBtns';
import { useState } from 'react';

const LineChartGraph = ({ data, maxValue, chartHeight, spacedStroke, fallbackStrokeColor, xDataKey, xDataColor, yDataColor, yAxisRange, tickValue, lineStyle, dataKeyName, lineColor, lineWidth, legendName, highValueColor, normalValueColor, legendVerticalPlace, legendHorizontalPlace, legendIconType, btnData, setNewBtnData }: LineChartType) => {
    const [updLineBtns, setUpdLineBtns] = useState<LineBtnType[]>(btnData ?? [])
    const handleBtnClick = (id: number) => {
        const newBtnData = updLineBtns?.map((btn, index) => {
            return {
                ...btn,
                active: index === id
            }
        })
        setUpdLineBtns(newBtnData)
        setNewBtnData(newBtnData);
    }
    return (
        <div className={`${lineChartCss['lip-lineChart__wrap']}`}>
            {btnData ? <LineChartBtns getBtnNames={updLineBtns} getActivateBtnFn={handleBtnClick} /> : ''}
            {/* line chart */}
            <ResponsiveContainer height={chartHeight}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray={spacedStroke} stroke={fallbackStrokeColor} />
                    <XAxis dataKey={xDataKey} stroke={xDataColor} />
                    <YAxis stroke={yDataColor} domain={yAxisRange} tickCount={tickValue} />
                    <Line type={lineStyle} dataKey={dataKeyName} stroke={lineColor} strokeWidth={lineWidth} name={legendName} dot={({ cx, cy, payload }) => (<Dot cx={cx} cy={cy} r={6} fill={payload.value === maxValue ? highValueColor : normalValueColor} />)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign={legendVerticalPlace} align={legendHorizontalPlace} iconType={legendIconType} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartGraph

// Custom tooltip
function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#1E1B4B', padding: 8, borderRadius: 4, color: 'white' }}>
                <strong>{label}</strong>
                <br />
                Footfall: {payload[0].value}
            </div>
        );
    }
    return null;
}
