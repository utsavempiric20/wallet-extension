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
          <Link to="/create">
            <div className={Style.createAccountBtn}>Create Account</div>
          </Link>
          <div className={Style.orTxt}>or</div>
          <Link to="/recover-account" style={{ textDecoration: "none" }}>
            <div className={Style.importAccountBtn}>
              Import Existing Account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountMain;
