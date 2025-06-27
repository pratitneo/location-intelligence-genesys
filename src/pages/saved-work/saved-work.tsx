import ProfileBox from "../../components/profileBox/profileBox";
import type { ProfileType } from "../../types/types";
import savedCss from "./savedWork.module.scss";
import Sidebar from '../../components/sidebar/sidebar'
import CategoryBox from '../../components/categoryBox/categoryBox'
import SiteScore from "../../components/siteScore/siteScore";
import SitePointers from "../../components/sitePointers/sitePointers";
import { Images } from "../../assets/assets";
import SiteScoreBtns from "../../components/siteScoreBtns/siteScoreBtns";

const SavedWork = ({ userName }: ProfileType) => {
    const savedData = [{ location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' },]
    const pointersData = [{ icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const scoreBtns = [{ icon: Images?.demographics }, { icon: Images?.footfall }, { icon: Images?.accessibility }, { icon: Images?.retail },]
    return (
        <>
            <Sidebar />
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
                </div>
            </div>
        </>
    )
}

export default SavedWork;
