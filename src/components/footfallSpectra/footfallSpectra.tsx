import DropownDesc from '../dropdownDesc/dropdownDesc'
import DrpdwnHead from '../drpdwnHead/drpdwnHead';
import FootfallVisitors from '../footfallVisitors/footfallVisitors';
import LineChartGraph from '../lineChart/lineChart';
import PieChartGraph from '../pieChart/pieChart'
import ftflSpectCss from './footfallSpectra.module.scss'
const FootfallSpectra = () => {
    const colorValues = ['#0088FE', '#00C49F',];
    const pieData = [{ name: 'others', value: 40 }, { name: 'bandra', value: 30 }, { name: 'khar', value: 40 }, { name: 'dharavi', value: 30 }, { name: 'mahim', value: 40 }, { name: 'kurla', value: 30 }];
    const peakVisitorData = [{ time: '12pm', avgVisitor: 1200, status: 'low' }, { time: '12pm', avgVisitor: 1200, status: 'high' }, { time: '12pm', avgVisitor: 1200, status: 'high' },]
    const nonPeakVisitorData = [{ time: '12pm', avgVisitor: 1200 }, { time: '12pm', avgVisitor: 1200 }, { time: '12pm', avgVisitor: 1200 },]


    return (
        <>
            <DropownDesc desc='Daily footfall peaks at 1,350 around noon and rebounds post 6 PM, driven by office workers and leisure shoppers' />
            {/* pie & visitors */}
            <div className={`${ftflSpectCss['lip-ftflSpect__wrap']}`}>
                <div className={`${ftflSpectCss['lip-ftflSpect__pie__visitors']}`}>
                    <div className={`${ftflSpectCss['lip-ftflSpect__pie']}`}>
                        <DrpdwnHead heading='where are people coming from' />
                        <PieChartGraph pieRadiusSize={50} colorsArr={colorValues} pieData={pieData} containerWidth={270} containerHeight={210} />
                    </div>
                    <div className={`${ftflSpectCss['lip-ftflSpect__visitors']}`}>
                        <FootfallVisitors peakHourData={peakVisitorData} nonPeakHourData={nonPeakVisitorData} />
                    </div>
                </div>
                {/* line chart */}
                <LineChartGraph />
            </div>
        </>
    )
}

export default FootfallSpectra