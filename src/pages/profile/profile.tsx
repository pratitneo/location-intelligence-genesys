import { useState } from 'react'
import ProfileBox from '../../components/profileBox/profileBox'
import Tabs from '../../components/tabs/tabs'
import type { ProfileType, TabsObj } from '../../types/types'
import profileCss from './profile.module.scss'
// import LoginInput from '../../components/loginInput/loginInput'
import Sidebar from '../../components/sidebar/sidebar'
import PersonalInfo from '../../components/personalInfo/personalInfo'
import RightSideBar from '../../components/rightSideBar/rightSideBar'
import CategoryBox from '../../components/categoryBox/categoryBox'

const Profile = ({ userName, fullName }: ProfileType) => {
    const tabs = [{ id: 1, label: 'profile', active: true }, { id: 2, label: 'categories', active: false }]
    const savedData = [{ location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' }, { location: 'bandra east', attributes: ['bandra east', 'fashion', 'draft'], date: '25-06-2025' },]
    const [tabNum, setTabNum] = useState(0)
    const [profileTabs, setProfileTabs] = useState(tabs)
    const [edit, setEdit] = useState(true)
    console.log(profileTabs, 'profileTabs')
    const handleTabs = (_selectedTab: TabsObj, selectedIndex: number) => {
        const updatedTabs = profileTabs?.map((tab, idx) => ({
            ...tab,
            active: idx === selectedIndex,
        }));
        setTabNum(selectedIndex)
        setProfileTabs(updatedTabs);
    };

    const handleEditState = () => {
        setEdit(prevEdit => !prevEdit)
    }

    return (
        <>
            <Sidebar />
            <div className={`${profileCss['lip-profile__wrap']}`}>
                <p className={`${profileCss['lip-profile__greet']}`}>Hello, {userName}</p>
                <div className={`${profileCss['lip-profile__main']}`}>
                    <p className={`${profileCss['lip-profile__name']}`}>{fullName}</p>
                    <Tabs tabsData={profileTabs} customCls='lip-tabs__profile' changeTabs={handleTabs} />
                    {tabNum === 0 ? (
                        <>
                            <ProfileBox head='change password' editBtn />
                            <ProfileBox head='personal information' editBtn getEditFn={handleEditState} getEditState={edit}>
                                <PersonalInfo getEditState={edit} getSaveAction={handleEditState} />
                            </ProfileBox>
                        </>

                    ) : (
                        <ProfileBox head='saved work'>
                            <div className={`${profileCss['lip-profile__categories']}`}>
                                <CategoryBox savedLocations={savedData} />
                            </div>
                        </ProfileBox>
                    )}
                </div>
            </div>
            <RightSideBar />
        </>
    )
}

export default Profile