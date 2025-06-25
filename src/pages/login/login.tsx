import { Link } from 'react-router-dom'
import LoginInput from '../../components/loginInput/loginInput'
import LoginChecbox from '../../components/loginCheckbox/loginCheckbox'
import loginCss from './login.module.scss'
import Button from '../../components/button/button'
import Separator from '../../components/separator/separator'
import { useState } from 'react'
import type { LoginDataType } from '../../types/types'
import { Images } from '../../assets/assets'

const Login = () => {
    const [loginData, setLoginData] = useState<LoginDataType>({ userEmail: '', userPassword: '' })
    console.log(loginData, 'loginData')
    const handleInput = (inputEvent: any) => {
        const { name, value, type } = inputEvent?.target
        // console.log(name, value, type, 'input')
        setLoginData((prevLoginData: LoginDataType) => ({
            ...prevLoginData,
            [name]: value
        }))
    }
    // ONLY FOR PASSWORD INPUT
    const handleTogglePassword = (inputEvent: any) => {
        const { type } = inputEvent?.target
        console.log(type, 'type')
    }
    return (
        <div className={`${loginCss['lip-login__wrap']}`}>
            {/* login box */}
            <div className={`${loginCss['lip-login__box']}`}>
                <img src={Images?.loginLogo} alt="" />
                <p className={`${loginCss['lip-login__head']} login-head`}>welcome back</p>
                <p className={`${loginCss['lip-login__subHead']} login-subHead`}>log in to your account</p>
                <LoginInput inputLabel='email' inputType='email' inputName='userEmail' inputId='email' inputValue={loginData?.userEmail} getInputValue={handleInput} />
                <LoginInput inputLabel='password' inputType='password' inputName='userPassword' inputId='password' icon='passwordEye' customCls='lip-input__password' inputValue={loginData?.userPassword} getInputValue={handleInput} getInputToggle={handleTogglePassword} />
                <div className={`${loginCss['lip-login__checkbox__forgot']}`}>
                    <LoginChecbox inputLabel='remember me' inputType='checkbox' inputName='rememberCheck' inputId='rememberbox' />
                    <Link className={`${loginCss['lip-login__forgot']}`} to={'/forgot-password'}>Forgot password?</Link>
                </div>
                <Button buttonText='get started' customCls='lip-login__btn' />
                <Separator separatorText='or' />
                <div className={`${loginCss['lip-login__new__signup']}`}>
                    <p className={`${loginCss['lip-login__newUser']}`}>new user?</p>
                    <Link to={'/sign-up'} className={`${loginCss['lip-login__signup']}`}>sign up here</Link>
                </div>
            </div>
        </div>
    )
}

export default Login