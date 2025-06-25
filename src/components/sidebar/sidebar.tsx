import { GoDatabase, GoLocation } from "react-icons/go"
import sideBarCss from './sidebar.module.scss'
import { useState } from "react"

const Sidebar = () => {
    const sideBarItems = [
        { id: 1, label: 'add dataset', icon: <GoDatabase /> }, { id: 2, label: 'site selection', icon: <GoLocation /> }
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
                <img src="/assets/sidebar-logo.png" alt="Spectra logo" />
                <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                <img src="/assets/sidebar-toggle.svg" alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
            </div>
            <div className={`${sideBarCss['lip-sidebar__items']}`}>
                {sideBarItems?.map((item, index) => {
                    return (
                        <div key={index} className={`${sideBarCss['lip-sidebar__item']}`}>
                            <div className={`${sideBarCss['lip-sidebar__icon']}`}>{item?.icon}</div>
                            <p className={`${sideBarCss['lip-sidebar__text']} ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>{item?.label}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar