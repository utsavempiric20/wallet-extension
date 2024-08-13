import React, { useState, useEffect } from "react";
import Style from "../VerifyPassPhrase/VerifyPassPhrase.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AlertComponent from "../../AlertComponent/AlertComponent";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [seedPhraseInfo, setSeedPhraseInfo] = useState({
    seedPhrase: "",
    password: "",
    confirmPassword: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const handleSeedPhrase = (e) => {
    const { name, value } = e.target;
    setSeedPhraseInfo({ ...seedPhraseInfo, [name]: value });
  };

  const checkDataDisabled = () => {
    if (seedPhraseInfo.password !== seedPhraseInfo.confirmPassword) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
    if (
      seedPhraseInfo.password !== seedPhraseInfo.confirmPassword ||
      seedPhraseInfo.password === "" ||
      seedPhraseInfo.confirmPassword === ""
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 3000);
    clearTimeout();
  };

  const verifyPhrase = (event) => {
    event.preventDefault();

    const userData = {
      seedPhrase: seedPhraseInfo.seedPhrase,
      password: seedPhraseInfo.password,
      confirm_password: seedPhraseInfo.confirmPassword,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/wallet/forgotPassword`, userData)
      .then((res) => {
        if (res.status === 200 && res.data.success === 1) {
          navigate("/unlock-wallet", { replace: true });
          handleAlert(res.data.data, "success", true);
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log("error", error);
      });
  };

  useEffect(() => {
    checkDataDisabled();
  }, [seedPhraseInfo]);

  return (
    <>
      <div className={Style.verifyPassPhrase}>
        <div className={Style.verifyPassPhrase_box}>
          <h2>Forgot Password</h2>
          <p>
            Enter your recovery phrase to complete the forgot password process.
          </p>

          <div className={Style.verifyPassPhrase_box_seed}>
            <div className="mb-3">
              <label htmlFor="seedPhrase_input">Passphrase (12 words)</label>
              <input
                type="text"
                className="form-control"
                name="seedPhrase"
                minLength="8"
                id="seedPhrase_input"
                placeholder="Enter seed phrase"
                value={seedPhraseInfo.seedPhrase}
                onChange={handleSeedPhrase}
              />
            </div>
          </div>
          <div className={Style.password_box}>
            <div className="mb-3">
              <label htmlFor="seedPhrase_input">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                minLength="8"
                id="password_input"
                placeholder="Enter password"
                value={seedPhraseInfo.password}
                onChange={handleSeedPhrase}
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
              <label htmlFor="seedPhrase_input">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                minLength="8"
                id="confirm_password_input"
                placeholder="Confirm password"
                value={seedPhraseInfo.confirmPassword}
                onChange={handleSeedPhrase}
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
          {errorMessage && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <button
            type="submit"
            className={Style.nextBtn}
            disabled={isDisabled}
            onClick={verifyPhrase}
          >
            Submit
          </button>
        </div>
        {showAlert.isDisplay && (
          <AlertComponent type={showAlert.type} message={showAlert.message} />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
