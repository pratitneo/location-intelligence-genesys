import sideBarCss from './sidebar.module.scss'
import { Images } from "../../assets/assets"
import { Link } from "react-router-dom"
import type { IconItem, SidebarType } from '../../types/types'
// import IconWithTooltip from '../iconWithTooltip/IconWithTooltip'
import SidebarBtn from '../sidebarBtn/sidebarBtn'

const Sidebar = ({ onIconClick, sidebarOpen, getToggleFn, sideText }: SidebarType & { sidebarOpen?: boolean, toggleSidebar?: () => void }) => {
    const iconList: IconItem[] = [
        { id: 1, icon: Images?.dataset, tooltip: "add dataset", key: "dataset" },
        { id: 2, icon: Images?.siteSelect, tooltip: "site selection", key: "siteSelection" },
    ];
    return (
        <>
            <div className={`${sideBarCss['lip-sidebar__wrap']} ${sidebarOpen ? sideBarCss['lip-sidebar--active'] : ''}`}>
                {/* product logo */}
                <div className={`${sideBarCss['lip-sidebar__logo']}`}>
                    <img src={Images?.sidebarLogo} alt="Spectra logo" />
                    <p className={`${sideBarCss['lip-sidebar__logo-text']}  ${sideText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>spectra</p>
                    <img src={Images?.sidebarToggle} alt="Toggle button" className={`${sideBarCss['lip-sidebar__toggle']}`} onClick={getToggleFn} />
                </div>
                {/* sidebar links */}
                <div className={`${sideBarCss['lip-sidebar__items']}`}>
                    {iconList?.map((item) => {
                        return (
                            <div key={item?.id} onClick={() => onIconClick(item.key)}>
                                {/* <IconWithTooltip icon={item?.icon} tooltipText={item?.tooltip} position="right" customCls='sidebarBtn' /> */}
                                <SidebarBtn sideBarText={sideText} sideBtnText={item?.tooltip} sideBtnIcon={item?.icon} />
                            </div>
                        )
                    })}
                </div>
                {/* saved work */}
                <Link to={'/saved-work'} className={`${sideBarCss['lip-sidebar__item']} ${sideBarCss['lip-sidebar__saved']}`}>
                    <img src={Images?.savedWork} alt="Saved Work" />
                    <p className={`${sideBarCss['lip-sidebar__text']} ${sideText ? sideBarCss['lip-sidebar__text--active'] : ''}`}>saved work</p>
                </Link>
            </div>
        </>
    )
}

export default Sidebar