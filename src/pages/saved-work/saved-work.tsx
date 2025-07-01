import ProfileBox from "../../components/profileBox/profileBox";
import type { ProfileType } from "../../types/types";
import savedCss from "./savedWork.module.scss";
import Sidebar from '../../components/sidebar/sidebar'
import CategoryBox from '../../components/categoryBox/categoryBox'
import SiteScore from "../../components/siteScore/siteScore";
import SitePointers from "../../components/sitePointers/sitePointers";
import { Images } from "../../assets/assets";
import SiteScoreBtns from "../../components/siteScoreBtns/siteScoreBtns";
import SiteScoreDrpDwn from "../../components/siteScoreDrpDwn/siteScoreDrpDwn";
import PieChartGraph from "../../components/pieChart/pieChart";
import Visitors from "../../components/visitors/visitors";
import FootfallVisitors from "../../components/footfallVisitors/footfallVisitors";
import LineChartGraph from "../../components/lineChart/lineChart";
import DemoSpectra from "../../components/demoSpectra/demoSpectra";

const SavedWork = ({ userName }: ProfileType) => {
    const savedData = [{ location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' },]
    const pointersData = [{ icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' }, { icon: '', value: 'high', label: 'target population presence' },]
    const scoreBtns = [{ icon: Images?.demographics }, { icon: Images?.footfall }, { icon: Images?.accessibility }, { icon: Images?.retail },]
    const drpDwns = [{ id: 1, icon: Images?.demographics, label: 'demographics' }, { id: 1, icon: Images?.footfall, label: 'footfall' }, { id: 1, icon: Images?.accessibility, label: 'accessibility' }, { id: 1, icon: Images?.retail, label: 'retail' },]
    const pieData = [{ name: 'others', value: 40 }, { name: 'bandra', value: 30 }, { name: 'khar', value: 40 }, { name: 'dharavi', value: 30 }, { name: 'mahim', value: 40 }, { name: 'kurla', value: 30 }];
    const colorValues = ['#0088FE', '#00C49F',];
    const peakVisitorData = [{ time: '12pm', avgVisitor: 1200, status: 'low' }, { time: '12pm', avgVisitor: 1200, status: 'high' }, { time: '12pm', avgVisitor: 1200, status: 'high' },]
    const nonPeakVisitorData = [{ time: '12pm', avgVisitor: 1200 }, { time: '12pm', avgVisitor: 1200 }, { time: '12pm', avgVisitor: 1200 },]
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
                    <div className={`${savedCss['lip-saved__drpdwnsWrap']}`}>
                        <SiteScoreDrpDwn drpDwnData={drpDwns[0]} children={<DemoSpectra />} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[1]} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[2]} />
                        <SiteScoreDrpDwn drpDwnData={drpDwns[3]} />
                    </div>
                    {/* pie & visitors */}
                    <div className={`${savedCss['lip-saved__pie__visitors']}`}>
                        <div className={`${savedCss['lip-saved__pie']}`}>
                            <PieChartGraph pieRadiusSize={50} colorsArr={colorValues} pieData={pieData} containerWidth={270} containerHeight={270} />
                        </div>
                        <div className={`${savedCss['lip-saved__visitors']}`}>
                            <FootfallVisitors peakHourData={peakVisitorData} nonPeakHourData={nonPeakVisitorData} />
                        </div>
                    </div>
                    {/* line chart */}
                    <LineChartGraph />
                </div>
            </div>
        </>
    )
}

export default SavedWork;
