import React, { useState } from "react";
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
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImportAccount = () => {
    navigate("/recover-account");
    handleClose();
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
          </div>
        </div>
        <div className={Style.account_box} onClick={handleOpen}>
          <VscAccount className={Style.vsAccount_icon} />
          <div className={Style.accountNum_txt}>28633df0b4150ca4ca2...</div>
          <TfiArrowCircleDown className={Style.tfiArrowCircleDown_icon} />
        </div>
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
              height: "290px",
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
                28633df0b4150ca4ca2...
              </div>

              <FiCopy className={Style.secure_box_copy_icon} />
            </div>

            <button
              className={Style.findAccountCBtn}
              type="submit"
              onClick={handleImportAccount}
            >
              <TfiImport />
              Import Account
            </button>
            <button className={Style.copyBtn}>
              <FaPlus className={Style.copyIcon} /> Create New Account
            </button>
          </Box>
          <Box className={Style.bottomBtnComponent}></Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
