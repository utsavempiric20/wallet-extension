import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Style from "./CreatePassword.module.css";

const CreatePassword = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePassword = (e) => {
    // setPasswordInfo();
  };

  return (
    <div className={Style.createPassword}>
      <div className={Style.createPassword_Box}>
        <h2>Create a Password</h2>
        <p>You will use this to unlock your wallet.</p>
        <div className={Style.password_box}>
          <div className="mb-3">
            <input
              type={showPassword ? "password" : "text"}
              className="form-control"
              id="password_input"
              placeholder="Enter password"
              value={passwordInfo.confirmPassword}
              onChange={handlePassword}
            />
            <div
              className={Style.password_box_eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
        </div>
        <div className={Style.password_box}>
          <div className="mb-3">
            <input
              type={showConfirmPassword ? "password" : "text"}
              className="form-control"
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
              {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
        </div>
        <div className={Style.firstCheckBox}>
          <input type="checkbox" />
          <p>
            I acknowledge that this password can not be used to recover my
            accounts, I still need to preserve the recovery methods used when
            first creating my accounts (seed phrase etc.)
          </p>
        </div>
        <div className={Style.firstCheckBox}>
          <input type="checkbox" />
          <p>
            I acknowledge that storing this password in my browser's password
            manager exposes me to additional risk (we recommend you do not).
          </p>
        </div>
        <div className={Style.nextBtn}>Next</div>
      </div>
    </div>
  );
};

export default CreatePassword;
