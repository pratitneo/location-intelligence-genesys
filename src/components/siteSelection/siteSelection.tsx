import { Images } from '../../assets/assets'
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
    const pointersData = [{ icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const scoreBtns = [{ icon: Images?.demographics }, { icon: Images?.footfall }, { icon: Images?.accessibility }, { icon: Images?.retail },]
    const drpDwns = [{ id: 1, icon: Images?.demographics, label: 'demographics' }, { id: 1, icon: Images?.footfall, label: 'footfall' }, { id: 1, icon: Images?.accessibility, label: 'accessibility' }, { id: 1, icon: Images?.retail, label: 'retail' },]

    return (
        <>
            <SiteScore score={7} location={'bandra (e), mumbai'} />
            <div className={`${siteSelCss['lip-siteSel__pointersWrap']}`}>
                <SitePointers pointersData={pointersData} />
            </div>
            <SiteScoreBtns btnsData={scoreBtns} />
            <div className={`${siteSelCss['lip-siteSel__drpdwnsWrap']}`}>
                <SiteScoreDrpDwn drpDwnData={drpDwns[0]} children={<DemoSpectra />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[1]} children={<FootfallSpectra />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[2]} children={<AccessibilitySpectra />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[3]} children={<RetailSpectra />} />
            </div>
        </>
    )
}

export default SiteSelection