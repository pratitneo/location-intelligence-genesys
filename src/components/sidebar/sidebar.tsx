import { GoDatabase, GoLocation } from "react-icons/go"
import sideBarCss from './sidebar.module.scss'
import { useState } from "react"
import { Images } from "../../assets/assets"

const Sidebar = () => {
    const sideBarItems = [
        { id: 1, label: 'add dataset', icon: Images?.dataset }, { id: 2, label: 'site selection', icon: Images?.siteSelect }
    ]
    const [sidebar, setSidebar] = useState(false)
    const [sideBarText, setSideBarText] = useState(false)
    const getToggleFn = () => {
        sidebar ? setTimeout(() => { setSidebar(prevSidebar => !prevSidebar) }, 500) : setSidebar(prevSidebar => !prevSidebar)
        !sidebar ? setTimeout(() => { setSideBarText(prevSideBarText => !prevSideBarText) }, 500) : setSideBarText(prevSideBarText => !prevSideBarText)
    }
    return (
        <div className={`${sideBarCss['lip-sidebar__wrap']} ${sidebar ? sideBarCss['lip-sidebar--active'] : ''}`}>
            <div className={`${sideBarCss['lip-sidebar__logo']}`}>
                <img src={Images?.sidebarLogo} alt="Spectra logo" />
                <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                <img src={Images?.sidebarToggle} alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
            </div>
            <div className={`${sideBarCss['lip-sidebar__items']}`}>
                {sideBarItems?.map((item, index) => {
                    return (
                        <div key={index} className={`${sideBarCss['lip-sidebar__item']}`}>
                            <img src={item?.icon} className={`${sideBarCss['lip-sidebar__icon']}`} />
                            <p className={`${sideBarCss['lip-sidebar__text']} ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>{item?.label}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar