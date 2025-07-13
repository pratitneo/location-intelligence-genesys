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
import { useSelectedHex } from '../selectedHexContext/SelectedHexContext'

const SiteSelection = () => {
    const pointersData = [{ icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const scoreBtns = [{ label: 'demographics', icon: Images?.demographics }, { label: 'footfall', icon: Images?.footfall }, { label: 'accessibility', icon: Images?.accessibility }, { label: 'retail', icon: Images?.retail },]
    const drpDwns = [{ id: 0, icon: Images?.demographics, label: 'demographics' }, { id: 1, icon: Images?.footfall, label: 'footfall' }, { id: 2, icon: Images?.accessibility, label: 'accessibility' }, { id: 3, icon: Images?.retail, label: 'retail' },]
    const { selectedHex } = useSelectedHex();

    // check if decimal less than 5 or greater
    const roundIfLessThanPointFive = (num: number) => num % 1 < 0.5 ? Math.floor(num) : Math.round(num);
    const getScore = roundIfLessThanPointFive(selectedHex?.properties?.['AHP Output'])



    return (
        <>
            <div className={`${siteSelCss['lip-siteSel__scorePointers']}`}>
                <SiteScore score={getScore ? getScore * 2 : 0} location={'bandra (e), mumbai'} />
                <div className={`${siteSelCss['lip-siteSel__pointersWrap']}`}>
                    <SitePointers pointersData={pointersData} />
                </div>
                <SiteScoreBtns btnsData={scoreBtns} />
            </div>
            <div className={`${siteSelCss['lip-siteSel__drpdwnsWrap']}`}>
                <SiteScoreDrpDwn drpDwnData={drpDwns[0]} children={<DemoSpectra hexData={selectedHex} />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[1]} children={<FootfallSpectra hexData={selectedHex} />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[2]} children={<AccessibilitySpectra hexData={selectedHex} />} />
                <SiteScoreDrpDwn drpDwnData={drpDwns[3]} children={<RetailSpectra hexData={selectedHex} />} />
            </div>
        </>
    )
}

export default SiteSelection