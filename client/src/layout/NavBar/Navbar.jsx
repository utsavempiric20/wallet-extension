import React, { useState, useEffect } from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/Wallet-logo.png";
import { LuWallet2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { TfiImport } from "react-icons/tfi";
import { FiCopy } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";
import axios from "axios";
import AlertComponent from "../../components/AlertComponent/AlertComponent";

const Navbar = (props) => {
  const { userDetails, selectedAccount, setSelectedAccount } = props;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImportAccount = () => {
    navigate("/recover-account");
    handleClose();
  };

  const handelCreateAccount = () => {
    navigate("/create-account");
    handleClose();
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 4000);
    clearTimeout();
  };

  const handleLockWallet = () => {
    const userData = {
      userId: userDetails.userId,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/wallet/lockAndUnlockWallet`,
        userData
      )
      .then((res) => {
        if (res.data.success === 1) {
          navigate("/unlock-wallet", { replace: true });
          const seedData = JSON.parse(localStorage.getItem("userData"));
          if (seedData) {
            const updatedData = { ...seedData, isWalletLock: 1 };
            localStorage.setItem("userData", JSON.stringify(updatedData));
            setSelectedAccount(null);
          }
          handleClose();
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{
          borderBottom: "1px solid rgb(240, 240, 241)",
          backgroundColor: "transparent !important",
        }}
      >
        <div className="container-fluid">
          <div className={Style.navBar_container_box}>
            <img src={logo} alt="logo" height={40} width={180} />
            {selectedAccount && (
              <ul className={Style.navBar_wallet_tabs}>
                <li
                  className={activeTab === "home" ? Style.active : ""}
                  onClick={() => handleTabClick("home")}
                >
                  <Link to="/home" className={Style.navBar_wallet_box}>
                    <LuWallet2 className={Style.luWallet_icon} />
                    <span className={Style.text}>Wallet</span>
                  </Link>
                </li>
                <li
                  className={activeTab === "profile" ? Style.active : ""}
                  onClick={() => handleTabClick("profile")}
                >
                  <Link to="/profile" className={Style.navBar_wallet_box}>
                    <VscAccount className={Style.luWallet_icon} />
                    <span className={Style.text}>Account</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        {selectedAccount && (
          <div className={Style.account_box} onClick={handleOpen}>
            <VscAccount className={Style.vsAccount_icon} />
            <div className={Style.accountNum_txt}>
              {selectedAccount && selectedAccount.address}
            </div>
            <TfiArrowCircleDown className={Style.tfiArrowCircleDown_icon} />
          </div>
        )}
      </nav>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
          " & .MuiDialog-container": {
            "& .MuiPaper-root": {
              position: "absolute",
              top: "50px",
              right: "0px",
              width: "320px",
              height: "380px",
            },
          },
        }}
        className={Style.dialogMain}
      >
        <DialogTitle className={Style.dialogTitle}>Account</DialogTitle>
        <DialogContent>
          <Box className={Style.passphrase_box}>
            <div className={Style.secure_box}>
              <div className={Style.secure_box_accountNum_txt}>
                {selectedAccount && selectedAccount.address}
              </div>

              <FiCopy
                className={Style.secure_box_copy_icon}
                onClick={() =>
                  navigator.clipboard.writeText(selectedAccount.address)
                }
              />
            </div>

            <button
              className={Style.findAccountCBtn}
              onClick={handleImportAccount}
            >
              <TfiImport />
              Import Account
            </button>

            <button className={Style.copyBtn} onClick={handelCreateAccount}>
              <FaPlus className={Style.copyIcon} /> Create New Account
            </button>
            <button
              className={Style.findAccountCBtn}
              onClick={handleLockWallet}
            >
              <IoIosLock />
              Lock Wallet
            </button>
          </Box>
          <Box className={Style.bottomBtnComponent}></Box>
        </DialogContent>
      </Dialog>
      {showAlert.isDisplay && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
    </div>
  );
};

export default Navbar;
