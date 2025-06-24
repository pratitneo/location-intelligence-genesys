
import { useState } from 'react'
import type { LoginInputType } from '../../types/types'
import inputCss from './loginInput.module.scss'
const LoginInput = ({ inputLabel, inputType, inputName, inputId, inputPlaceholder, icon, customCls, inputValue, getInputValue, getInputToggle }: LoginInputType) => {
    const [visible, setVisible] = useState(false)
    console.log(visible, 'visible')
    const updateVisibilityState = () => {
        setVisible(prev => !prev)
    }
    const currentType = visible ? 'text' : inputType
    return (
        <div className={`${inputCss['lip-input__wrap']} ${inputValue ? inputCss['lip-input--filled'] : ''}`}>
            <input type={inputName === 'userEmail' ? inputType : currentType} name={inputName} id={inputId} placeholder={inputPlaceholder} className={`${inputCss['lip-input__inputBox']}`} onChange={getInputValue} />
            <label htmlFor={inputId} className={`${inputCss['lip-input__label']}`}>{inputLabel}</label>
            {icon ? <img src={`/assets/${icon}.svg`} alt={`${icon}`} className={`${inputCss[`${customCls}`]} ${inputCss['lip-input__icon']}`} onClick={updateVisibilityState} /> : ''}
        </div>
    )
}

export default LoginInput