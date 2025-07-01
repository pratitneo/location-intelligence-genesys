import sideBarCss from './sidebar.module.scss'
import { useState } from "react"
import { Images } from "../../assets/assets"
import { Link } from "react-router-dom"
import type { IconItem, SidebarType } from '../../types/types'
// import IconWithTooltip from '../iconWithTooltip/IconWithTooltip'
import SidebarBtn from '../sidebarBtn/sidebarBtn'

const Sidebar = ({ onIconClick }: SidebarType) => {
    const [sidebar, setSidebar] = useState(false)
    const [sideBarText, setSideBarText] = useState(false)
    const iconList: IconItem[] = [
        { id: 1, icon: Images?.dataset, tooltip: "add dataset", key: "dataset" },
        { id: 2, icon: Images?.siteSelect, tooltip: "site selection", key: "siteSelection" },
    ];
    const getToggleFn = () => {
        sidebar ? setTimeout(() => { setSidebar(prevSidebar => !prevSidebar) }, 500) : setSidebar(prevSidebar => !prevSidebar)
        !sidebar ? setTimeout(() => { setSideBarText(prevSideBarText => !prevSideBarText) }, 500) : setSideBarText(prevSideBarText => !prevSideBarText)
    }
    return (
        <>
            <div className={`${sideBarCss['lip-sidebar__wrap']} ${sidebar ? sideBarCss['lip-sidebar--active'] : ''}`}>
                {/* product logo */}
                <div className={`${sideBarCss['lip-sidebar__logo']}`}>
                    <img src={Images?.sidebarLogo} alt="Spectra logo" />
                    <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                    <img src={Images?.sidebarToggle} alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
                </div>
                {/* sidebar links */}
                <div className={`${sideBarCss['lip-sidebar__items']}`}>
                    {iconList?.map((item) => {
                        return (
                            <div key={item?.id} onClick={() => onIconClick(item.key)}>
                                {/* <IconWithTooltip icon={item?.icon} tooltipText={item?.tooltip} position="right" customCls='sidebarBtn' /> */}
                                <SidebarBtn sideBarText={sideBarText} sideBtnText={item?.tooltip} sideBtnIcon={item?.icon} />
                            </div>
                        )
                    })}
                </div>
                {/* saved work */}
                <Link to={'/saved-work'} className={`${sideBarCss['lip-sidebar__item']} ${sideBarCss['lip-sidebar__saved']}`}>
                    <img src={Images?.savedWork} alt="Saved Work" />
                    <p className={`${sideBarCss['lip-sidebar__text']} ${sideBarText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>saved work</p>
                </Link>
            </div>
        </>
    )
}

export default Sidebar