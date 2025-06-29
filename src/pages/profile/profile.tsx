import { useState } from "react";
import ProfileBox from "../../components/profileBox/profileBox";
import Tabs from "../../components/tabs/tabs";
import type { ProfileType, TabsObj } from "../../types/types";
import profileCss from "./profile.module.scss";
// import LoginInput from '../../components/loginInput/loginInput'
import Sidebar from "../../components/sidebar/sidebar";
import PersonalInfo from "../../components/personalInfo/personalInfo";
import CategoryBox from "../../components/categoryBox/categoryBox";
import DropdownDesc from "../../components/dropdownDesc/dropdownDesc";
import DemoStats from "../../components/demoStats/demoStats";
import { Images } from "../../assets/assets";
import DemoAffluence from "../../components/demoAffluence/demoAffluence";
import DrpdwnHead from "../../components/drpdwnHead/drpdwnHead";
import AgeDistribution from "../../components/ageDistribution/ageDistribution";
import ClothingSpendLevel from "../../components/clothingSpendLevel/clothingSpendLevel";

const demoStatsData = [
  { icon: Images?.totalPopulation, value: 82400, label: "total population" },
  { icon: Images?.households, value: 18500, label: "Number of households" },
  { icon: Images?.male, value: "~42000", label: "Number of males" },
  { icon: Images?.female, value: "~40000", label: "Number of females" },
];
type SpendingLevel = "High" | "Moderate" | "Low";

const spendingSegments: { spendLevel: SpendingLevel; percentage: string; approxCount: string }[] = [
  {
    spendLevel: "High",
    percentage: "22%",
    approxCount: "18,100"
  },
  {
    spendLevel: "Moderate",
    percentage: "44%",
    approxCount: "36,250"
  },
  {
    spendLevel: 'Low',
    percentage: "34%",
    approxCount: "28,050"
  }
];

const ageDistributionData = [
  {
    ageRange: "0–15 Years",
    total: "12,700",
    male: "6,500",
    female: "6,200",
  },
  {
    ageRange: "16–30 Years",
    total: "9,200",
    male: "8,800",
    female: "18,000",
  },
  {
    ageRange: "31–50 Years",
    total: "14,000",
    male: "17,800",
    female: "27,800",
  },
  {
    ageRange: ">50 Years",
    total: "7,800",
    male: "8,400",
    female: "16,200",
  },
];

 

const Profile = ({ userName, fullName }: ProfileType) => {
  const tabs = [
    { id: 1, label: "profile", active: true },
    { id: 2, label: "categories", active: false },
  ];
  const savedData = [
    {
      location: "bandra east",
      attributes: ["bandra east", "fashion", "draft"],
      date: "25-06-2025",
    },
    {
      location: "bandra east",
      attributes: ["bandra east", "fashion", "draft"],
      date: "25-06-2025",
    },
    {
      location: "bandra east",
      attributes: ["bandra east", "fashion", "draft"],
      date: "25-06-2025",
    },
  ];
  const [tabNum, setTabNum] = useState(0);
  const [profileTabs, setProfileTabs] = useState(tabs);
  const [edit, setEdit] = useState(true);
  console.log(profileTabs, "profileTabs");
  const handleTabs = (_selectedTab: TabsObj, selectedIndex: number) => {
    const updatedTabs = profileTabs?.map((tab, idx) => ({
      ...tab,
      active: idx === selectedIndex,
    }));
    setTabNum(selectedIndex);
    setProfileTabs(updatedTabs);
  };

  const handleEditState = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  return (
    <>
      <Sidebar />
      <div className={`${profileCss["lip-profile__wrap"]}`}>
        <p className={`${profileCss["lip-profile__greet"]}`}>
          Hello, {userName}
        </p>
        <div className={`${profileCss["lip-profile__main"]}`}>
          <p className={`${profileCss["lip-profile__name"]}`}>{fullName}</p>
          <Tabs
            tabsData={profileTabs}
            customCls="lip-tabs__profile"
            changeTabs={handleTabs}
          />
          {tabNum === 0 ? (
            <>
              <ProfileBox head="change password" editBtn />
              <ProfileBox
                head="personal information"
                editBtn
                getEditFn={handleEditState}
                getEditState={edit}
              >
                <PersonalInfo
                  getEditState={edit}
                  getSaveAction={handleEditState}
                />
              </ProfileBox>
            </>
          ) : (
            <ProfileBox head="saved work">
              <div className={`${profileCss["lip-profile__categories"]}`}>
                <CategoryBox savedLocations={savedData} />
              </div>
            </ProfileBox>
          )}

          <DropdownDesc 
            desc = {"Bandra East scores 7/10 for site suitability, driven by strong youth presence, high footfall, and affluent population pockets"}
          />

          <div className={`${profileCss["lip-profile__statAffluence"]}`}>
            <div className={`${profileCss["lip-profile__demoStats"]}`}>
              {demoStatsData.map((item, index) => (
                <DemoStats
                  key={index}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </div>

            <DemoAffluence />
          </div>

          <div className={`${profileCss["lip-profile__customerSpending"]}`}>
            <DrpdwnHead icon={Images?.walletMoney} heading={"Customers Spending on clothing"} isFull={true}/>
            <div className={`${profileCss["lip-profile__customerSpending__box"]}`}>
              {spendingSegments.map((segment, index) => (
              <ClothingSpendLevel
                key={index}
                spendLevel={segment.spendLevel}
                percentage={segment.percentage}
                approxCount={segment.approxCount}
                />
              ))}
            </div>
          </div>

          <div className={`${profileCss["lip-profile__ageDistribution"]}`}>
            <DrpdwnHead icon={Images?.ageGroup} heading={"Age Distribution"} isFull={true}/>
            <div className={`${profileCss["lip-profile__ageDistribution__box"]}`}>
              <div className={`${profileCss["lip-profile__ageDistribution__insideBox"]}`}>
              {ageDistributionData.map((item, index) => (
               <AgeDistribution key={index} ageRange={item.ageRange} total={item.total} male={item.male} female={item.female} />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
