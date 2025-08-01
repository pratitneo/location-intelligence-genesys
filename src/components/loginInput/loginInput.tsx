import { useState } from "react";
import type { LoginInputType, IconKeys, LoginInputProps } from "../../types/types";
import inputCss from "./loginInput.module.scss";
import { Images } from "../../assets/assets";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const LoginInput = ({ inputLabel, inputType, inputName, inputId, inputPlaceholder, icon, customCls, inputValue, freezeInput, getInputValue }: LoginInputProps) => {
  const [visible, setVisible] = useState(false);
  const updateVisibilityState = () => {
    setVisible((prev) => !prev);
  };
  const currentType = inputName === "userPassword" && visible ? "text" : inputType;

  return (
    <div className={`${inputCss["lip-input__wrap"]} ${inputValue ? inputCss["lip-input--filled"] : ""}`}>
      <input type={currentType} name={inputName} id={inputId} placeholder={inputPlaceholder} className={`${inputCss["lip-input__inputBox"]}`} onChange={getInputValue} disabled={freezeInput} />
      <label htmlFor={inputId} className={`${inputCss["lip-input__label"]}`}>{inputLabel}</label>
      {/* password eye */}
      {icon === "passwordEye" ? (<span id="password-eye" className={`${inputCss[`${customCls}`]} ${inputCss["lip-input__icon"]}`} onClick={updateVisibilityState}>{visible ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}</span>) : ''}
    </div >
  );
};

export default LoginInput;
