import BarChartGraph from '../barChart/barChart'
import DonutChart from '../donutChart/donutChart'
import DropownDesc from '../dropdownDesc/dropdownDesc'
import TotalAddMark from '../totalAddMark/totalAddMark'
import retailCss from './retailSpectra.module.scss'
const RetailSpectra = () => {
    return (
        <div>
            <DropownDesc desc='Surrounded by brands like Westside and Max, and 38% retail mix in fashion, the area balances competition with high shopper density' />
            <div className={`${retailCss['lip-retail__wrap']}`}>
                <div className={`${retailCss['lip-retail__tam__bar']}`}>
                    <TotalAddMark tamNum={22} />
                    <BarChartGraph />
                </div>
                <div className={`${retailCss['lip-retail__donutCharts']}`}>
                    <DonutChart />
                    <DonutChart />
                </div>
            </div>
        </div>
    )
}

export default RetailSpectra