import ProfileBox from "../../components/profileBox/profileBox";
import type { ProfileType } from "../../types/types";
import savedCss from "./savedWork.module.scss";
import CategoryBox from '../../components/categoryBox/categoryBox'
import SiteScore from "../../components/siteScore/siteScore";
import SitePointers from "../../components/sitePointers/sitePointers";
import { Images } from "../../assets/assets";
import SiteScoreBtns from "../../components/siteScoreBtns/siteScoreBtns";
import SiteScoreDrpDwn from "../../components/siteScoreDrpDwn/siteScoreDrpDwn";
import DemoSpectra from "../../components/demoSpectra/demoSpectra";
import AccessibilitySpectra from "../../components/accessibilitySpectra/accessibilitySpectra";
import FootfallSpectra from "../../components/footfallSpectra/footfallSpectra";

const SavedWork = ({ userName }: ProfileType) => {
    const savedData = [{ location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' },]
    const pointersData = [{ icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const scoreBtns = [{ icon: Images?.demographics }, { icon: Images?.footfall }, { icon: Images?.accessibility }, { icon: Images?.retail },]
    const drpDwns = [{ id: 1, icon: Images?.demographics, label: 'demographics' }, { id: 1, icon: Images?.footfall, label: 'footfall' }, { id: 1, icon: Images?.accessibility, label: 'accessibility' }, { id: 1, icon: Images?.retail, label: 'retail' },]

    return (
        <>
            <div className={`${savedCss['lip-saved__wrap']}`}>
                <p className={`${savedCss['lip-saved__greet']}`}>Hello, {userName}</p>
                <div className={`${savedCss['lip-saved__main']}`}>
                    {/* <p className={`${savedCss['lip-saved__name']}`}>saved work</p> */}
                    <ProfileBox head='saved work'>
                        <div className={`${savedCss['lip-saved__categories']}`}>
                            <CategoryBox savedLocations={savedData} />
                        </div>
                    </ProfileBox>
                    <SiteScore score={7} location={'bandra (e), mumbai'} />
                    <div className={`${savedCss['lip-saved__pointersWrap']}`}>
                        <SitePointers pointersData={pointersData} />
                    </div>
                    <SiteScoreBtns btnsData={scoreBtns} />
                    <div className={`${savedCss['lip-saved__drpdwnsWrap']}`}>
                        <SiteScoreDrpDwn drpDwnData={drpDwns[0]} children={<DemoSpectra />} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[1]} children={<FootfallSpectra />} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[2]} children={<AccessibilitySpectra />} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[3]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SavedWork;
