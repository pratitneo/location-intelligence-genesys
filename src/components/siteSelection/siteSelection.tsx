import { Images } from '../../assets/assets'
import { useSelectedHex } from '../../context/SelectedHexContext'
import AccessibilitySpectra from '../accessibilitySpectra/accessibilitySpectra'
import DemoSpectra from '../demoSpectra/demoSpectra'
import FootfallSpectra from '../footfallSpectra/footfallSpectra'
import RetailSpectra from '../retailSpectra/retailSpectra'
import SitePointers from '../sitePointers/sitePointers'
import SiteScore from '../siteScore/siteScore'
import SiteScoreBtns from '../siteScoreBtns/siteScoreBtns'
import SiteScoreDrpDwn from '../siteScoreDrpDwn/siteScoreDrpDwn'
import siteSelCss from './siteSelection.module.scss'

const SiteSelection = () => {
    const { selectedHex } = useSelectedHex();
    const getHexData = selectedHex?.properties
    // const pointersData = [{ icon: '', value: getHexData?.target_population_presence, label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const getHouseHoldIncome = getHexData?.['Household Income'] ? `₹${getHexData?.['Household Income'].toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2, })}` : undefined;
    const pointersData = [{ value: getHexData?.target_population_presence, label: 'target population presence' }, { value: getHexData?.footfall_daily_visitors, label: 'footfall daily visitors' }]
    if (getHouseHoldIncome) {
        pointersData.push({ value: getHouseHoldIncome, label: 'household income' })
    }
    const scoreBtns = [{ label: 'demographics', icon: Images?.demographics }, { label: 'footfall', icon: Images?.footfall }, { label: 'accessibility', icon: Images?.accessibility }, { label: 'retail', icon: Images?.retail },]
    const drpDwns = [{ id: 0, icon: Images?.demographics, label: 'demographics' }, { id: 1, icon: Images?.footfall, label: 'footfall' }, { id: 2, icon: Images?.accessibility, label: 'accessibility' }, { id: 3, icon: Images?.retail, label: 'retail' },]

    // check if decimal less than 5 or greater
    const roundIfLessThanPointFive = (num: number) => num % 1 < 0.5 ? Math.floor(num) : Math.round(num);
    const ahpScore = selectedHex?.properties?.ahp_scores;
    const getScore = (ahpScore == null || isNaN(ahpScore)) ? 0 : roundIfLessThanPointFive(ahpScore);


    return (
        <>
            <div className={`${siteSelCss['lip-siteSel__scorePointers']}`}>
                <SiteScore score={getScore ?? 0} location={'Dadar (e), mumbai'} />
                <div className={`${siteSelCss['lip-siteSel__pointersWrap']}`}>
                    <SitePointers pointersData={pointersData} />
                </div>
                <SiteScoreBtns btnsData={scoreBtns} />
            </div>
            <div className={`${siteSelCss['lip-siteSel__drpdwnsWrap']}`}>
                <SiteScoreDrpDwn drpDwnData={drpDwns[0]} children={<DemoSpectra hexData={selectedHex} />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[1]} children={<FootfallSpectra hexData={selectedHex} />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[2]} children={<AccessibilitySpectra />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[3]} children={<RetailSpectra hexData={selectedHex} />} />
            </div>
        </>
    )
}

export default SiteSelection