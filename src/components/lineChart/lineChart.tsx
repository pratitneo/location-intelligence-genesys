import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Dot, Legend } from 'recharts';
import lineChartCss from './lineChart.module.scss'
import type { LineChartType } from '../../types/types';

const LineChartGraph = ({ data, maxValue, chartHeight, spacedStroke, fallbackStrokeColor, xDataKey, xDataColor, yDataColor, yAxisRange, tickValue, lineStyle, dataKeyName, lineColor, lineWidth, legendName, highValueColor, normalValueColor, legendVerticalPlace, legendHorizontalPlace, legendIconType }: LineChartType) => {
    return (
        <div className={`${lineChartCss['lip-lineChart__wrap']}`}>
            {/* line chart header */}
            <div className={`${lineChartCss['lip-lineChart__header']}`}>
                <p className={`${lineChartCss['lip-lineChart__head']}`}>Footfall Prediction</p>
                <div>
                    <button style={tabStyle('green')}>Daily</button>
                    <button style={tabStyle()}>Weekly</button>
                    <button style={tabStyle()}>Monthly</button>
                </div>
            </div>
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

// Button style helper
const tabStyle = (activeColor = '') => ({
    background: activeColor ? '#059669' : '#6B21A8',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 6,
    color: 'white',
    marginLeft: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
});

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
