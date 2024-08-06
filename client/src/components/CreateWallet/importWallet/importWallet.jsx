import React, { useState, useEffect } from "react";
import Style from "../VerifyPassPhrase/VerifyPassPhrase.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AlertComponent from "../../AlertComponent/AlertComponent";
import axios from "axios";

const ImportWallet = (props) => {
  const { userDetails } = props;
  const navigate = useNavigate();
  const [seedPhraseInfo, setSeedPhraseInfo] = useState({
    seedPhrase: "",
    password: "",
    confirmPassword: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSeedPhrase = (e) => {
    const { name, value } = e.target;
    setSeedPhraseInfo({ ...seedPhraseInfo, [name]: value });
  };

  const checkDataDisabled = () => {
    if (seedPhraseInfo.password !== seedPhraseInfo.confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
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

    const seedArray = seedPhraseInfo.seedPhrase.split(" ");
    if (seedArray.length != 12) {
      handleAlert(
        "Provided seed phrase must be at least 12 words long",
        "error",
        true
      );
    } else {
      const userData = {
        seedPhrase: seedPhraseInfo.seedPhrase,
        password: seedPhraseInfo.password,
        confirm_password: seedPhraseInfo.confirmPassword,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/wallet/importWallet`, userData)
        .then((res) => {
          if (res.status === 200 && res.data.success === 1) {
            const userData = {
              seed: res.data.data.seed,
              _id: res.data.data._id,
              isWalletLock: res.data.data.isWalletLock,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            navigate("/unlock-wallet", { replace: true });
          }
          console.log("res", res);
        })
        .catch((error) => {
          handleAlert(error.response.data.data, "error", true);
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    checkDataDisabled();
  }, [seedPhraseInfo]);

  return (
    <>
      <div className={Style.verifyPassPhrase}>
        <div className={Style.verifyPassPhrase_box}>
          <h2>Import Wallet</h2>
          <p>
            Enter the following word from your recovery phrase to complete the
            setup process.
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button
            type="submit"
            className={Style.nextBtn}
            disabled={isDisabled}
            onClick={verifyPhrase}
          >
            Import
          </button>
        </div>
        {showAlert.isDisplay && (
          <AlertComponent type={showAlert.type} message={showAlert.message} />
        )}
      </div>
    </>
  );
};

export default ImportWallet;
