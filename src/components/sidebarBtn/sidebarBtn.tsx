import type { SideBtnType } from '../../types/types'
import sideBtnCss from './sidebarBtn.module.scss'
const SidebarBtn = ({ sideBtnIcon, sideBtnText, sideBarText, getActionFn }: SideBtnType) => {
    return (
        <div className={`${sideBtnCss['lip-sidebtn__item']}`} onClick={getActionFn}>
            {sideBtnIcon ? <img src={sideBtnIcon} className={`${sideBtnCss['lip-sidebtn__icon']}`} /> : ''}
            <p className={`${sideBtnCss['lip-sidebtn__text']} ${sideBarText ? sideBtnCss['lip-sidebtn__text--active'] : ''}`}>{sideBtnText}</p>
        </div>
    )
}

export default SidebarBtn