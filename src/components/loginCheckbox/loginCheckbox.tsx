
import type { LoginInputType } from '../../types/types'
import checkCss from './loginCheckbox.module.scss'
const LoginChecbox = ({ inputLabel, inputType, inputName, inputId, inputPlaceholder }: LoginInputType) => {
    return (
        <div className={`${checkCss['lip-input__wrap']}`}>
            <input type={inputType} name={inputName} id={inputId} placeholder={inputPlaceholder} className={`${checkCss['lip-input__checkBox']}`} />
            <label htmlFor={inputId} className={`${checkCss['lip-input__label']}`}>{inputLabel}</label>
        </div>
    )
}

export default LoginChecbox