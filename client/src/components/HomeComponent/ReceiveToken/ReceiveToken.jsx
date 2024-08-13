import React, { useState, useEffect } from "react";
import Style from "./ReceiveToken.module.css";
import { FiCopy } from "react-icons/fi";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AlertComponent from "../../AlertComponent/AlertComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { MdOutlineArrowBackIos } from "react-icons/md";

const ReceiveToken = (props) => {
  const { userDetails, selectedAccount } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (num) => {
    setOpen(true);
    setIsSeedOrKey(num);
  };
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [isSeedOrKey, setIsSeedOrKey] = useState(0);

  const [showPrivateKey, setShowPrivateKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    confirm_password: "",
  });
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: value,
    });
  };

  const handleDialog1 = (isSeedOrKey) => {
    // event.preventDefault();
    const userData = {
      userId: userDetails.userId,
      accountAddress: selectedAccount.address,
      password: passwordInfo.password,
      confirm_password: passwordInfo.confirm_password,
      isSecretSeedInfo: isSeedOrKey,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/wallet/revealSecretData`,
        userData
      )
      .then((res) => {
        if (res.status == 200) {
          setShowPrivateKey(res.data.data);
          handleClose();
          handleOpen2();
          setPasswordInfo({ password: "", confirm_password: "" });
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };

  const accountAvatarName = (name) => {
    const singleChar = name.charAt(0);
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (char >= "0" && char <= "9") {
        return singleChar + char;
      }
    }
    return null;
  };
  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 4000);
    clearTimeout();
  };

  const checkDataDisabled = () => {
    if (passwordInfo.password !== passwordInfo.confirm_password) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
    if (
      passwordInfo.password !== passwordInfo.confirm_password ||
      passwordInfo.password === "" ||
      passwordInfo.confirm_password === "" ||
      passwordInfo.password.length < 8 ||
      passwordInfo.confirm_password.length < 8
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkDataDisabled();
  }, [passwordInfo]);
  return (
    <>
      <div className={Style.receiveToken}>
        <div className={Style.receiveToken_box}>
          <div className={Style.back_icon} onClick={handleGoBack}>
            <MdOutlineArrowBackIos />
          </div>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>
                {selectedAccount &&
                  accountAvatarName(selectedAccount.accountName)}
              </div>
            </div>
          </center>

          <h4>{selectedAccount && selectedAccount.accountName}</h4>
          <QRCode
            size={256}
            className={Style.qrCode}
            value={selectedAccount.address}
            level="H"
            viewBox={`0 0 256 256`}
          />
          <div className={Style.accountAddress_box}>
            <div>{selectedAccount && selectedAccount.address}</div>
            <FiCopy
              className={Style.copyIcon}
              onClick={() => {
                navigator.clipboard.writeText(selectedAccount.address);
              }}
            />
          </div>
          <button className={Style.showKeyBtn} onClick={() => handleOpen(0)}>
            Show private key
          </button>
          <button className={Style.showKeyBtn} onClick={() => handleOpen(1)}>
            Reveal Seed Phrase
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle className={Style.dialogTitle}>
          {isSeedOrKey == 0 ? "Show Private Key" : "Reveal Seed Phrase"}
        </DialogTitle>
        <DialogContent>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>
                {selectedAccount &&
                  accountAvatarName(selectedAccount.accountName)}
              </div>
            </div>
            <h4 className={Style.dialog_account_txt}>
              {selectedAccount && selectedAccount.accountName}
            </h4>
            <div className={Style.dialog_accountAddress_box}>
              <div>{selectedAccount && selectedAccount.address}</div>
              <FiCopy
                className={Style.copyIcon}
                onClick={() => {
                  navigator.clipboard.writeText(selectedAccount.address);
                }}
              />
            </div>
          </center>

          <div className={Style.password_box}>
            <div className="mb-3">
              <label htmlFor="accountName_input">Password</label>
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
              <label htmlFor="accountName_input">Confirm password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirm_password"
                minLength="8"
                id="confirm_password_input"
                placeholder="Enter password"
                value={passwordInfo.confirm_password}
                onChange={handlePassword}
              />
              <div
                className={Style.password_box_eye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          {errorMessage && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <Box className={Style.bottomBtnDialogComponent}>
            <button
              className={Style.cancelBtn}
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className={Style.nextBtn}
              type="submit"
              onClick={() => handleDialog1(isSeedOrKey)}
              disabled={isDisabled}
            >
              Confirm
            </button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle className={Style.dialogTitle}>
          {isSeedOrKey == 0 ? "Show Private Key" : "Reveal Seed Phrase"}
        </DialogTitle>
        <DialogContent>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>
                {selectedAccount &&
                  accountAvatarName(selectedAccount.accountName)}
              </div>
            </div>
            <h4 className={Style.dialog_account_txt}>
              {selectedAccount && selectedAccount.accountName}
            </h4>
            <div className={Style.dialog_accountAddress_box}>
              <div>{selectedAccount && selectedAccount.address}</div>
              <FiCopy
                className={Style.copyIcon}
                onClick={() => {
                  navigator.clipboard.writeText(selectedAccount.address);
                }}
              />
            </div>
          </center>

          <div className={Style.dialog_private_key_title}>
            {isSeedOrKey == 0 ? "Private key for Account 1" : "Seed Phrase"}
          </div>
          <div className={Style.private_key_txt_box}>
            <div className={Style.private_key_txt}>{showPrivateKey}</div>
            <FiCopy
              className={Style.copyIcon}
              onClick={() => {
                navigator.clipboard.writeText(showPrivateKey);
              }}
            />
          </div>
          <Box className={Style.bottomBtnDialogComponent}>
            <button
              className={Style.nextBtn}
              type="submit"
              onClick={handleClose2}
            >
              Done
            </button>
          </Box>
          {showAlert.isDisplay && (
            <AlertComponent type={showAlert.type} message={showAlert.message} />
          )}
        </DialogContent>
      </Dialog>
      {showAlert.isDisplay && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
    </>
  );
};

export default ReceiveToken;
