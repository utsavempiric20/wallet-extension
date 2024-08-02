import React from "react";
import Style from "./ImportAccount.module.css";
import { TfiKey } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ImportAccount = () => {
  return (
    <div className={Style.importAccount}>
      <div className={Style.importAccount_box}>
        <h2>Import Account</h2>
        <p className={Style.importAccount_txt}>
          If you’ve setup one or more account recovery methods, follow the
          instructions below to import your account.
        </p>

        <div className={Style.passBox_center}>
          <div className={Style.passBox}>
            <div className={Style.passBox_icon_txt}>
              <div className={Style.passBox_contract_icon}>
                <TfiKey />
              </div>
              <div className={Style.passBox_txt}>Private Key</div>
            </div>
            <div className={Style.passBox_passTxt}>
              Make sure you have your private key started with ed25519, then
              click below to begin the recovery process.
            </div>
            <Link to="/recover-seed-phrase" className={Style.recoverAccounTxt}>
              <button>Recover Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportAccount;
