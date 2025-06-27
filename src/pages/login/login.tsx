import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/loginInput/loginInput";
import LoginChecbox from "../../components/loginCheckbox/loginCheckbox";
import loginCss from "./login.module.scss";
import Button from "../../components/button/button";
import Separator from "../../components/separator/separator";
import { useState } from "react";
import type { ErrorDataType, LoginDataType } from "../../types/types";
import { Images } from "../../assets/assets";
import { DEFAULT_USER } from "../../utils/auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginDataType>({
    userEmail: "",
    userPassword: "",
  });

  const [errors, setErrors] = useState<ErrorDataType>({
    userEmail: "",
    userPassword: "",
  });

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { userEmail: "", userPassword: "" };

    if (!loginData.userEmail.trim()) {
      newErrors.userEmail = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        loginData.userEmail
      )
    ) {
      newErrors.userEmail = "Invalid email address";
      isValid = false;
    }

    if (!loginData.userPassword.trim()) {
      newErrors.userPassword = "Password is required";
      isValid = false;
    } else if (loginData.userPassword.length < 6) {
      newErrors.userPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  console.log(loginData, "loginData");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  // ONLY FOR PASSWORD INPUT
  const handleTogglePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = e.target;
    console.log(type, "type");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { userEmail, userPassword } = loginData;
    if (
      userEmail === DEFAULT_USER.username &&
      userPassword === DEFAULT_USER.password
    ) {
      toast.success("Successfully logged in", {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });

      sessionStorage.setItem("auth", "true");

      setTimeout(() => {
        navigate("/landingPage");
      }, 1000);
    } else {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };
  return (
    <div className={`${loginCss["lip-login__wrap"]}`}>
      {/* login box */}
      <form onSubmit={handleSubmit} className={`${loginCss["lip-login__box"]}`}>
        <img src={Images?.loginLogo} alt="" />
        <p className={`${loginCss["lip-login__head"]} login-head`}>
          welcome back
        </p>
        <p className={`${loginCss["lip-login__subHead"]} login-subHead`}>
          log in to your account
        </p>
        <LoginInput
          inputLabel="email"
          inputType="text"
          inputName="userEmail"
          inputId="email"
          inputValue={loginData?.userEmail}
          getInputValue={handleInput}
        />
        {errors.userEmail && (
          <p className={`${loginCss["lip-login__error-text"]}`}>
            {errors.userEmail}
          </p>
        )}
        <LoginInput
          inputLabel="password"
          inputType="password"
          inputName="userPassword"
          inputId="password"
          icon="passwordEye"
          customCls="lip-input__password"
          inputValue={loginData?.userPassword}
          getInputValue={handleInput}
          getInputToggle={handleTogglePassword}
        />
        {errors.userPassword && (
          <p className={`${loginCss["lip-login__error-text"]}`}>
            {errors.userPassword}
          </p>
        )}
        <div className={`${loginCss["lip-login__checkbox__forgot"]}`}>
          <LoginChecbox
            inputLabel="remember me"
            inputType="checkbox"
            inputName="rememberCheck"
            inputId="rememberbox"
          />
          <Link
            className={`${loginCss["lip-login__forgot"]}`}
            to={"/forgot-password"}
          >
            Forgot password?
          </Link>
        </div>
        <Button
          buttonText="get started"
          customCls="lip-login__btn"
          type="submit"
        />
        <Separator separatorText="or" />
        <div className={`${loginCss["lip-login__new__signup"]}`}>
          <p className={`${loginCss["lip-login__newUser"]}`}>new user?</p>
          <Link to={"/sign-up"} className={`${loginCss["lip-login__signup"]}`}>
            sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
