import type { ButtonType } from "../../types/types";
import buttonCss from "./button.module.scss";
const Button = ({ buttonId, buttonText, getBtnState, customCls, getBtnAction, type = "button" }: ButtonType) => {
  return (
    <button id={buttonId} type={type} className={`${buttonCss["lip-button"]} ${buttonCss[`${customCls}`]} ${getBtnState ? buttonCss["lip-button--disable"] : ""}`} onClick={getBtnAction}>{buttonText}</button>
  );
};

export default Button;
