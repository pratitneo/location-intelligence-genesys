
import { useState } from 'react'
import type { LoginInputType } from '../../types/types'
import inputCss from './loginInput.module.scss'
import { Images } from '../../assets/assets'

type IconKeys = keyof typeof Images;

interface LoginInputProps extends Omit<LoginInputType, 'icon'> {
    icon?: IconKeys;
}

const LoginInput = ({ inputLabel, inputType, inputName, inputId, inputPlaceholder, icon, customCls, inputValue, freezeInput, getInputValue, getInputToggle }: LoginInputProps) => {
    const [visible, setVisible] = useState(false)
    console.log(visible, 'visible')
    const updateVisibilityState = () => {
        setVisible(prev => !prev)
    }
    const currentType = visible ? 'text' : inputType
    return (
        <div className={`${inputCss['lip-input__wrap']} ${inputValue ? inputCss['lip-input--filled'] : ''}`}>
            <input type={inputName === 'userEmail' ? inputType : currentType} name={inputName} id={inputId} placeholder={inputPlaceholder} className={`${inputCss['lip-input__inputBox']}`} onChange={getInputValue} disabled={freezeInput} />
            <label htmlFor={inputId} className={`${inputCss['lip-input__label']}`}>{inputLabel}</label>
            {icon ? <img src={Images?.[icon]} alt={icon} className={`${inputCss[`${customCls}`]} ${inputCss['lip-input__icon']}`} onClick={updateVisibilityState} /> : ''}
        </div>
    )
}

export default LoginInput