import React, { useState, useEffect } from "react";
import Style from "./RecoverPrivateKey.module.css";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../../AlertComponent/AlertComponent";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import logo from "../../../assets/logo1.avif";
import { MdOutlineArrowBackIos } from "react-icons/md";

const RecoverSeedPhrase = (props) => {
  const navigate = useNavigate();
  const { userDetails } = props;
  const [privateKey, setPrivateKey] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const [manualImportData, setManualImportData] = useState({
    passphrase: "",
    accountId: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSeedPhrase = (e) => {
    setPrivateKey(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const checkDataDisabled = () => {
    if (privateKey !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 4000);
    clearTimeout();
  };

  const handleManualImportAccount = (e) => {
    setManualImportData({
      ...manualImportData,
      [e.target.name]: e.target.value,
    });
  };

  const addManualImportAccount = (event) => {
    event.preventDefault();
  };

  const addPrivateKey = (event) => {
    event.preventDefault();
    const userData = {
      privateKey: privateKey,
      userId: userDetails.userId,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/wallet/importAccount`, userData)
      .then((res) => {
        if (res.data.success === 1) {
          navigate("/home", { replace: true });
          setPrivateKey("");
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };

  useEffect(() => {
    checkDataDisabled();
  }, [privateKey]);

  return (
    <>
      <div className={Style.recoverSeedPhrase}>
        <div className={Style.recoverSeedPhrase_box}>
          <div className={Style.back_icon} onClick={handleGoBack}>
            <MdOutlineArrowBackIos />
          </div>
          <center>
            <img src={logo} alt="logo" height={180} width={180} />
          </center>
          <h2>Recover using Private Key</h2>
          <p>Enter the private key associated with the account.</p>

          <div className={Style.recoverSeedPhrase_box_seed}>
            <div className="mb-3">
              <label htmlFor="seedPhrase_input">Private Key</label>
              <input
                type="text"
                className="form-control"
                name="privateKey"
                minLength="12"
                id="seedPhrase_input"
                placeholder="Enter Private Key"
                value={privateKey}
                onChange={handleSeedPhrase}
              />
            </div>
          </div>

          {/* <Link to="/recover-seed-phrase" className={Style.nextBtntxt}> */}
          <button
            className={Style.nextBtn}
            disabled={isDisabled}
            onClick={addPrivateKey}
          >
            Find My Account
          </button>
          {/* </Link> */}

          {/* <div className={Style.recoverSeedPhrase_box_find_accountTxt}>
            <div className={Style.cantAccountText}>
              Can't find your account?
            </div>
            <div className={Style.importTxt_Box}>
              <Link className={Style.importTxt} onClick={handleOpen}>
                Import it manually.
              </Link>
            </div>
          </div> */}
        </div>
        {showAlert.isDisplay && (
          <AlertComponent type={showAlert.type} message={showAlert.message} />
        )}
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
        className={Style.dialogMain}
      >
        <DialogTitle className={Style.dialogTitle}>
          Manual Import Account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => addManualImportAccount(event)}>
            <Box className={Style.passphrase_box}>
              <div className={Style.manualImportAccountTextField}>
                <div className="mb-3">
                  <label htmlFor="seedPhrase_input">Passphrase</label>
                  <input
                    type="text"
                    className="form-control"
                    name="passphrase"
                    id="passphrase_input"
                    placeholder="Enter seed phrase"
                    value={manualImportData.passphrase}
                    onChange={handleManualImportAccount}
                  />
                </div>
              </div>
            </Box>
            <Box className={Style.passphrase_box}>
              <div className={Style.manualImportAccountTextField}>
                <div className="mb-3">
                  <label htmlFor="seedPhrase_input">
                    Insert your account ID here to import your account
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountId"
                    id="accountId_input"
                    placeholder="your account name"
                    value={manualImportData.accountId}
                    onChange={handleManualImportAccount}
                  />
                </div>
              </div>
            </Box>
            <Box className={Style.passphrase_box}>
              <div className={Style.manualImportAccountTextField}>
                <div className="mb-3">
                  <label htmlFor="seedPhrase_input">Public key</label>
                  <input
                    type="text"
                    className="form-control"
                    name="privateKey"
                    minLength="8"
                    id="seedPhrase_input"
                    placeholder="-"
                    // value={privateKey}
                    // onChange={handleManualImportAccount}
                  />
                </div>
              </div>
            </Box>
            <Box className={Style.bottomBtnComponent}>
              <div className={Style.cancelBtn} onClick={handleClose}>
                Cancel
              </div>
              <button className={Style.findAccountCBtn} type="submit">
                Find My Account
              </button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecoverSeedPhrase;
