import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import DrpdwnHead from '../drpdwnHead/drpdwnHead';

const data = [
    { category: 'Accessibility Index', score: 8.2 },
    { category: 'Public Transport Connectivity', score: 9.0 },
    { category: 'Road Network & Traffic Hotspots', score: 5.5 },
    { category: 'Average Drive Time', score: 6.0 },
    { category: 'Travel Distance', score: 7.0 },
];

const RadarChartGraph = () => {
    return (
        <div style={{ backgroundColor: '#4C1D95', padding: 20, borderRadius: 12 }}>
            <h3 style={{ color: 'white' }}></h3>
            <DrpdwnHead heading='Accessibility - Bandra East' customCls='radar-chart' />

            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius={'80%'} data={data}>
                    <PolarGrid stroke="#9333EA" />
                    <PolarAngleAxis dataKey="category" stroke="white" tick={{ fontSize: 16 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#E0E7FF" tick={{ fill: '#E0E7FF', fontSize: 10 }} />
                    <Radar name="Metric" dataKey="score" stroke="#93C5FD" fill="#93C5FD" fillOpacity={0.4}>
                        <LabelList dataKey="score" position="top" stroke="#93C5FD" fill="#93C5FD" fontSize={14} />
                    </Radar>
                    <Tooltip contentStyle={{ backgroundColor: '#1E1B4B', border: 'none', borderRadius: '6px', color: 'white', fontSize: 13, }} formatter={(value: number, name: string) => [`${value}`, 'Score']} labelFormatter={(label: string) => `${label}`} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ color: '#E0E7FF', fontSize: 12 }} />
                </RadarChart>
            </ResponsiveContainer>
            {/* <ResponsiveContainer width="100%" height={chartHeight}>
                <RadarChart cx="50%" cy="50%" outerRadius={chartRadialSize} data={data}>
                    <PolarGrid stroke={internalLineColor} />
                    <PolarAngleAxis dataKey={labelKey} stroke={outsideLineColor} tick={{ fontSize: 16 }} />
                    <PolarRadiusAxis angle={markLineAngle} domain={valueRangeArr} stroke={markLineColor} tick={{ fill: '#E0E7FF', fontSize: 10 }} />
                    <Radar name={labelName} dataKey={dataNumKey} stroke={internalBorderColor} fill={internalFillColor} fillOpacity={fillColorOpacity}>
                        <LabelList dataKey={internalBorderValKey} position={internalValPos} stroke={internalValColor} fill="#93C5FD" fontSize={internalValSize} />
                    </Radar>
                    <Tooltip contentStyle={{ backgroundColor: '#1E1B4B', border: 'none', borderRadius: '6px', color: 'white', fontSize: 13, }} formatter={(value: number, name: string) => [`${value}`, 'Score']} labelFormatter={(label: string) => `${label}`} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ color: '#E0E7FF', fontSize: 12 }} />
                </RadarChart>
            </ResponsiveContainer> */}
            <DrpdwnHead heading='Scoring 8.2 on accessibility, Bandra East offers excellent
                public transport (9.0) and moderate road ease with an average 16-min commute.' />
        </div>
    );
};

export default RadarChartGraph;
