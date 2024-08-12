import React from "react";
import Style from "./CreateAccountMain.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.avif";

const CreateAccountMain = () => {
  return (
    <div className={Style.createAccountMain}>
      <div className={Style.createAccountMainBox}>
        <div>
          <img src={logo} alt="logo" height={180} width={180} />
        </div>
        <h2>BLUESKY is here.</h2>
        <p>
          Securely store and stake your BLUESKY tokens and compatible assets
          with BLUESKY Wallet.
        </p>
        <div className={Style.createAccountMain_btn_box}>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <div className={Style.createAccountBtn}>Create Account</div>
          </Link>
          <div className={Style.orTxt}>or</div>
          <Link to="/import-wallet" style={{ textDecoration: "none" }}>
            <div className={Style.createAccountBtn}>Import Wallet</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountMain;
