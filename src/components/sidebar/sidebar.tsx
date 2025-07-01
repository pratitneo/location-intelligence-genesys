import { GoDatabase, GoLocation } from "react-icons/go"
import sideBarCss from './sidebar.module.scss'
import { useState } from "react"
import { Images } from "../../assets/assets"
import { Link } from "react-router-dom"
import SidebarBtn from "../sidebarBtn/sidebarBtn"

const Sidebar = () => {
    const sideBarItems = [{ id: 1, label: 'add dataset', icon: Images?.dataset }, { id: 2, label: 'site selection', icon: Images?.siteSelect }, { id: 2, label: 'profile', link: '/profile', icon: Images?.savedWork }]
    const [sidebar, setSidebar] = useState(false)
    const [sideBarText, setSideBarText] = useState(false)
    const getToggleFn = () => {
        sidebar ? setTimeout(() => { setSidebar(prevSidebar => !prevSidebar) }, 500) : setSidebar(prevSidebar => !prevSidebar)
        !sidebar ? setTimeout(() => { setSideBarText(prevSideBarText => !prevSideBarText) }, 500) : setSideBarText(prevSideBarText => !prevSideBarText)
    }
    return (
        <div className={`${sideBarCss['lip-sidebar__wrap']} ${sidebar ? sideBarCss['lip-sidebar--active'] : ''}`}>
            {/* product logo */}
            <div className={`${sideBarCss['lip-sidebar__logo']}`}>
                <img src={Images?.sidebarLogo} alt="Spectra logo" />
                <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                <img src={Images?.sidebarToggle} alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
            </div>
            {/* sidebar links */}
            <div className={`${sideBarCss['lip-sidebar__items']}`}>
                <SidebarBtn sideBtnText="add dataset" sideBtnIcon={Images?.dataset} sideBarText={sideBarText} />
                <SidebarBtn sideBtnText="site selection" sideBtnIcon={Images?.siteSelect} sideBarText={sideBarText} />
            </div>
            {/* saved work */}
            <Link to={'/saved-work'} className={`${sideBarCss['lip-sidebar__item']} ${sideBarCss['lip-sidebar__saved']}`}>
                <img src={Images?.savedWork} alt="Saved Work" />
                <p className={`${sideBarCss['lip-sidebar__text']} ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>saved work</p>

            </Link>
        </div>
    )
}

export default Sidebar