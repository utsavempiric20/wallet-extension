import React from "react";
import Style from "./CreateAccountMain.module.css";

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
          <div className={Style.createAccountBtn}>Create Account</div>
          <div className={Style.orTxt}>or</div>
          <div className={Style.importAccountBtn}>Import Existing Account</div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountMain;
