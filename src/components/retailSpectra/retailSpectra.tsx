import BarChartGraph from '../barChart/barChart'
import DonutChart from '../donutChart/donutChart'
import DropownDesc from '../dropdownDesc/dropdownDesc'
import TotalAddMark from '../totalAddMark/totalAddMark'
import retailCss from './retailSpectra.module.scss'
const RetailSpectra = () => {

    const COLORS = ['#6FFFE9', '#F5B942', '#FB7185'];
    const data = [
        { name: 'commercial', value: 65, colorName: '#6fffe9' },
        { name: 'residential', value: 35, colorName: '#F5B942' },
    ];
    const data2 = [
        { name: 'fashion', value: 42, colorName: '#6fffe9' },
        { name: 'food', value: 38, colorName: '#F5B942' },
        { name: 'others', value: 20, colorName: '#fb7185' },
    ];


    return (
        <div>
            <DropownDesc desc='Surrounded by brands like Westside and Max, and 38% retail mix in fashion, the area balances competition with high shopper density' />
            <div className={`${retailCss['lip-retail__wrap']}`}>
                <div className={`${retailCss['lip-retail__tam__bar']}`}>
                    <TotalAddMark tamNum={22} />
                    <BarChartGraph />
                </div>
                <div className={`${retailCss['lip-retail__donutCharts']}`}>
                    <DonutChart boxHeight={200} donutData={data} inRadiusVal={60} outRadiusVal={90} colors={COLORS} numberDataKey={'value'} pieCenterTextColor={'white'} chartTextOne='commercial' chartTextTwo='ratio' />
                    <DonutChart boxHeight={200} donutData={data2} inRadiusVal={60} outRadiusVal={90} colors={COLORS} numberDataKey={'value'} pieCenterTextColor={'white'} chartTextOne='retail' chartTextTwo='mix' />
                </div>
            </div>
        </div>
    )
}

export default RetailSpectra