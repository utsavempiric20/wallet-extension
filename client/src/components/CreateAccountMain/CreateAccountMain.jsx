import React from "react";
import Style from "./CreateAccountMain.module.css";
import { Link } from "react-router-dom";

const CreateAccountMain = () => {
  return (
    <div className={Style.createAccountMain}>
      <div className={Style.createAccountMainBox}>
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
