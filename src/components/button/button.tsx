import type { ButtonType } from '../../types/types'
import buttonCss from './button.module.scss'
const Button = ({ buttonText, customCls }: ButtonType) => {
    return (
        <button className={`${buttonCss['lip-button']} ${buttonCss[`${customCls}`]}`}>{buttonText}</button>
    )
}

export default Button