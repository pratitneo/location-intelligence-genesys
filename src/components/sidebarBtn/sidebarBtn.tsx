import type { SideBtnType } from '../../types/types'
import sideBtnCss from './sidebarBtn.module.scss'
const SidebarBtn = ({ sidebarBtnId, sideBtnIcon, sideBtnText, sideBarText }: SideBtnType) => {
    return (
        <div id={sidebarBtnId} className={`${sideBtnCss['lip-sidebtn__item']}`}>
            {sideBtnIcon ? <img src={sideBtnIcon} className={`${sideBtnCss['lip-sidebtn__icon']}`} /> : ''}
            <p className={`${sideBtnCss['lip-sidebtn__text']} ${sideBarText ? sideBtnCss['lip-sidebtn__text--active'] : ''}`}>{sideBtnText}</p>
        </div>
    )
}

export default SidebarBtn