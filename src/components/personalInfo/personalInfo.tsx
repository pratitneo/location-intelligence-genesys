import { useState } from 'react'
import LoginInput from '../loginInput/loginInput'
import type { PersonalDataType, PersonalInfoType } from '../../types/types'
import Button from '../button/button'

const PersonalInfo = ({ getEditState, getSaveAction }: PersonalInfoType) => {
    const [loginData, setLoginData] = useState<PersonalDataType>({ firstName: '', lastName: '', userName: '', userEmail: '' })
    console.log(loginData, 'loginData')
    const handleInput = (inputEvent: any) => {
        const { name, value, type } = inputEvent?.target
        // console.log(name, value, type, 'input')
        setLoginData((prevLoginData: PersonalDataType) => ({
            ...prevLoginData,
            [name]: value
        }))
    }
    return (
        <div>
            <LoginInput inputId='firstName' inputLabel='first name' inputName='firstName' inputType='text' inputValue={loginData?.firstName} getInputValue={handleInput} freezeInput={getEditState} />
            <LoginInput inputId='lastName' inputLabel='last name' inputName='lastName' inputType='text' inputValue={loginData?.lastName} getInputValue={handleInput} freezeInput={getEditState} />
            <LoginInput inputId='username' inputLabel='username' inputName='userName' inputType='text' inputValue={loginData?.userName} getInputValue={handleInput} freezeInput={getEditState} />
            <LoginInput inputId='email' inputLabel='email' inputName='userEmail' inputType='text' inputValue={loginData?.userEmail} getInputValue={handleInput} freezeInput={getEditState} />
            <Button buttonText='save' customCls='lip-profile__btn' getBtnState={getEditState} getBtnAction={getSaveAction} />
        </div>
    )
}

export default PersonalInfo