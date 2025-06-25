import { useState } from 'react'
import LoginInput from '../loginInput/loginInput'
import type { PersonalInfoType } from '../../types/types'

const PersonalInfo = () => {
    const [loginData, setLoginData] = useState<PersonalInfoType>({ firstName: '', lastName: '', userName: '', userEmail: '' })
    console.log(loginData, 'loginData')
    const handleInput = (inputEvent: any) => {
        const { name, value, type } = inputEvent?.target
        // console.log(name, value, type, 'input')
        setLoginData((prevLoginData: PersonalInfoType) => ({
            ...prevLoginData,
            [name]: value
        }))
    }
    return (
        <div>
            <LoginInput inputId='firstName' inputLabel='first name' inputName='firstName' inputType='text' inputValue={loginData?.firstName} getInputValue={handleInput} freezeInput />
            <LoginInput inputId='lastName' inputLabel='last name' inputName='lastName' inputType='text' inputValue={loginData?.lastName} getInputValue={handleInput} freezeInput />
            <LoginInput inputId='username' inputLabel='username' inputName='userName' inputType='text' inputValue={loginData?.userName} getInputValue={handleInput} freezeInput />
            <LoginInput inputId='email' inputLabel='email' inputName='userEmail' inputType='text' inputValue={loginData?.userEmail} getInputValue={handleInput} freezeInput />
        </div>
    )
}

export default PersonalInfo