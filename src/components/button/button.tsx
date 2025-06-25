import type { ButtonType } from '../../types/types'
import buttonCss from './button.module.scss'
const Button = ({ buttonText, getBtnState, customCls, getBtnAction }: ButtonType) => {
    return (
        <button className={`${buttonCss['lip-button']} ${buttonCss[`${customCls}`]} ${getBtnState ? buttonCss['lip-button--disable'] : ''}`} onClick={getBtnAction}>{buttonText}</button>
    )
}

export default Button