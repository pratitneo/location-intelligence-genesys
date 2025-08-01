
import type { BtnIconType } from '../../types/types'
import btnIcnCss from './buttonIcon.module.scss'
const ButtonIcon = ({ trailIcon, btnText, leadIcon, mainCls, bgCls }: BtnIconType) => {
    return (
        <div className={`${mainCls ? btnIcnCss[`lip-btnIcn__${mainCls}`] : ''} ${bgCls ? btnIcnCss[`lip-btnIcn--${bgCls}`] : ''}`}>
            {trailIcon ? <img src={trailIcon} alt='Button Icon' /> : ''}
            <span>{btnText}</span>
            {leadIcon ? <img src={leadIcon} alt='ButtonIcon' /> : ''}
        </div>
    )
}

export default ButtonIcon