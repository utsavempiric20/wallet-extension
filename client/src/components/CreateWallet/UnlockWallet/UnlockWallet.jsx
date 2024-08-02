import React, { useState, useEffect } from "react";
import Style from "./UnlockWallet.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../../AlertComponent/AlertComponent";

const UnlockWallet = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home", { replace: true });
    // handleAlert();
  };

  const handleAlert = () => {
    setErrorMessage(true);
    setTimeout(() => {
      setErrorMessage(false);
    }, 4000);
    clearTimeout();
  };

  const checkDataDisabled = () => {
    if (password === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkDataDisabled();
  }, [password]);

  return (
    <div className={Style.unlockWallet}>
      <div className={Style.unlockWallet_Box}>
        <h2>Unlock Wallet</h2>
        <p>
          Welcome back, the web3 world awaits you. Enter your password to unlock
          your wallet.
        </p>
        <div className={Style.password_box}>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              minLength="8"
              id="password_input"
              placeholder="Enter password"
              value={password}
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

        <Link to="/forgot-password" className={Style.forgotTxt}>
          <div>Forgot password?</div>
        </Link>

        <button disabled={isDisabled} onClick={handleSubmit}>
          Unlock Wallet
        </button>
      </div>
      {errorMessage && (
        <AlertComponent type="error" message="You entered wrong password" />
      )}
    </div>
  );
};

export default UnlockWallet;
