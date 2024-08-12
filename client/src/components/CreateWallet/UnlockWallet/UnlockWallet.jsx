import React, { useState, useEffect } from "react";
import Style from "./UnlockWallet.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../../AlertComponent/AlertComponent";
import axios from "axios";
import logo from "../../../assets/logo1.avif";

const UnlockWallet = (props) => {
  const { userDetails, setUserDetails } = props;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userId: userDetails.userId,
      password: password,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/wallet/lockAndUnlockWallet`,
        userData
      )
      .then((res) => {
        if (res.data.success === 2) {
          const seedData = JSON.parse(localStorage.getItem("userData"));
          if (seedData) {
            const updatedData = { ...seedData, isWalletLock: 0 };
            localStorage.setItem("userData", JSON.stringify(updatedData));
          }
          navigate("/home", { replace: true });
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
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
        <center>
          <img src={logo} alt="logo" height={180} width={180} />
        </center>

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
      {showAlert.isDisplay && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
    </div>
  );
};

export default UnlockWallet;
