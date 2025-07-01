import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Dot, Legend } from 'recharts';
import lineChartCss from './lineChart.module.scss'

const data = [{ day: 'Mon', value: 10200 }, { day: 'Tue', value: 9300 }, { day: 'Wed', value: 9600 }, { day: 'Thu', value: 9800 }, { day: 'Fri', value: 11500 }, { day: 'Sat', value: 13900 }, { day: 'Sun', value: 12700 }];
const maxValue = Math.max(...data.map(d => d.value));

const LineChartGraph = () => {
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
            <ResponsiveContainer height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#734199" />
                    <XAxis dataKey="day" stroke="white" />
                    <YAxis stroke="white" domain={[0, 20000]} />
                    <Line type="monotone" dataKey="value" stroke="#93C5FD" strokeWidth={2} name="Footfall (Predicted)" dot={({ cx, cy, payload }) => (<Dot cx={cx} cy={cy} r={6} fill={payload.value === maxValue ? '#059669' : '#60A5FA'} />)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: 'white', fontSize: 16 }}
                    />
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
