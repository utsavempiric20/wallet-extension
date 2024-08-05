import React, { useState, useEffect } from "react";
import Style from "./ReceiveToken.module.css";
import { FiCopy } from "react-icons/fi";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AlertComponent from "../../AlertComponent/AlertComponent";

const ReceiveToken = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleAlert();
    handleClose();
    handleOpen2();
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
    <>
      <div className={Style.receiveToken}>
        <div className={Style.receiveToken_box}>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>A1</div>
            </div>
          </center>

          <h4>Account1</h4>
          <div className={Style.accountAddress_box}>
            <div>0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc</div>
            <FiCopy
              className={Style.copyIcon}
              onClick={() => {
                navigator.clipboard.writeText(
                  "0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc"
                );
              }}
            />
          </div>
          <button className={Style.showKeyBtn} onClick={handleOpen}>
            Show private key
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
          Show Private Key
        </DialogTitle>
        <DialogContent>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>A1</div>
            </div>
            <h4 className={Style.dialog_account_txt}>Account1</h4>
            <div className={Style.dialog_accountAddress_box}>
              <div>0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc</div>
              <FiCopy
                className={Style.copyIcon}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc"
                  );
                }}
              />
            </div>
          </center>

          <div className={Style.password_box}>
            <div className="mb-3">
              <label htmlFor="accountName_input">Enter your password</label>
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
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Confirm
            </button>
          </Box>
          {errorMessage && (
            <AlertComponent type="error" message="you entered wrong password" />
          )}
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
          Show Private Key
        </DialogTitle>
        <DialogContent>
          <center>
            <div className={Style.account_icon_box}>
              <div className={Style.account_icon_txt}>A1</div>
            </div>
            <h4 className={Style.dialog_account_txt}>Account1</h4>
            <div className={Style.dialog_accountAddress_box}>
              <div>0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc</div>
              <FiCopy
                className={Style.copyIcon}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "0x96D590A01E2954124D30F9C29e32ba0Fe29d76Bc"
                  );
                }}
              />
            </div>
          </center>

          <div className={Style.dialog_private_key_title}>
            Private key for Account 1
          </div>
          <div className={Style.private_key_txt_box}>
            <div className={Style.private_key_txt}>
              57b9c34cf1976bd3800f648e6ec5e31e5fb4ee5fc838edf11c24aa836f7992d0
            </div>
            <FiCopy
              className={Style.copyIcon}
              onClick={() => {
                navigator.clipboard.writeText(
                  "57b9c34cf1976bd3800f648e6ec5e31e5fb4ee5fc838edf11c24aa836f7992d0"
                );
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
          {errorMessage && (
            <AlertComponent type="error" message="you entered wrong password" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReceiveToken;
