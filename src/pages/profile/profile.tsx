import { useState } from 'react'
import ProfileBox from '../../components/profileBox/profileBox'
import Tabs from '../../components/tabs/tabs'
import type { ProfileType, TabsObj } from '../../types/types'
import profileCss from './profile.module.scss'
// import LoginInput from '../../components/loginInput/loginInput'
import Sidebar from '../../components/sidebar/sidebar'
import PersonalInfo from '../../components/personalInfo/personalInfo'

const Profile = ({ userName, fullName }: ProfileType) => {
    const tabs = [{ id: 1, label: 'profile', active: true }, { id: 2, label: 'categories', active: false }]
    const [tabNum, setTabNum] = useState(0)
    const [profileTabs, setProfileTabs] = useState(tabs)
    console.log(profileTabs, 'profileTabs')
    const handleTabs = (_selectedTab: TabsObj, selectedIndex: number) => {
        const updatedTabs = profileTabs?.map((tab, idx) => ({
            ...tab,
            active: idx === selectedIndex,
        }));
        setTabNum(selectedIndex)
        setProfileTabs(updatedTabs);
    };

    return (
        <>
            <Sidebar />
            <div className={`${profileCss['lip-profile__wrap']}`}>
                <p className={`${profileCss['lip-profile__greet']}`}>Hello, {userName}</p>
                <div className={`${profileCss['lip-profile__main']}`}>
                    <p className={`${profileCss['lip-profile__name']}`}>{fullName}</p>
                    <Tabs tabsData={profileTabs} customCls='lip-tabs__profile' changeTabs={handleTabs} />
                    {tabNum === 0 ? <ProfileBox head='change password' /> : (
                        <ProfileBox head='personal information'>
                            <PersonalInfo />
                        </ProfileBox>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile