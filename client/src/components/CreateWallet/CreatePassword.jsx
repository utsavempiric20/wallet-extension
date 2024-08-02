import React, { useState, useEffect } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Style from "./CreatePassword.module.css";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    confirmPassword: "",
    firstCheck: false,
    secondCheck: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const handlePassword = (e) => {
    const { name, value, checked, type } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = () => {
    if (passwordInfo.password !== passwordInfo.confirmPassword) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
    if (
      passwordInfo.password !== passwordInfo.confirmPassword ||
      passwordInfo.password === "" ||
      passwordInfo.confirmPassword === "" ||
      !passwordInfo.firstCheck ||
      !passwordInfo.secondCheck
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/create-ac", { replace: true });
  };

  useEffect(() => {
    validatePassword();
  }, [passwordInfo]);

  return (
    <div className={Style.createPassword}>
      <div className={Style.createPassword_Box}>
        <h2>Create a Password</h2>
        <p>You will use this to unlock your wallet.</p>
        <div className={Style.password_box}>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              minLength="8"
              id="password_input"
              placeholder="Enter password"
              value={passwordInfo.password}
              onChange={handlePassword}
            />
            <div
              className={Style.password_box_eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
        </div>
        <div className={Style.password_box}>
          <div className="mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              name="confirmPassword"
              minLength="8"
              id="password_input"
              placeholder="Confirm password"
              value={passwordInfo.confirmPassword}
              onChange={handlePassword}
            />
            <div
              className={Style.password_box_eye}
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
        </div>
        {errorMessage && <p style={{ color: "red" }}>Passwords do not match</p>}
        <div className={Style.firstCheckBox}>
          <input
            type="checkbox"
            name="firstCheck"
            defaultChecked={passwordInfo.firstCheck}
            onChange={handlePassword}
          />
          <p>
            I acknowledge that this password can not be used to recover my
            accounts, I still need to preserve the recovery methods used when
            first creating my accounts (seed phrase etc.)
          </p>
        </div>
        <div className={Style.firstCheckBox}>
          <input
            type="checkbox"
            name="secondCheck"
            checked={passwordInfo.secondCheck}
            onChange={handlePassword}
          />
          <p>
            I acknowledge that storing this password in my browser's password
            manager exposes me to additional risk (we recommend you do not).
          </p>
        </div>

        <button disabled={isDisabled} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;
