import React from "react";
import { Link } from "react-router-dom";
import Style from "./ChooseSecurityMethod.module.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LiaFileContractSolid } from "react-icons/lia";

const ChooseSecurityMethod = () => {
  return (
    <div className={Style.chooseSecurityMethod}>
      <div className={Style.chooseSecurityMethod_box}>
        <h2>Choose a Security Method</h2>
        <p>
          Select a method to secure and recover your account. This will be used
          to verify important activity, recover your account and access your
          account from other devices.
        </p>

        <div className={Style.most_rec_box}>
          <div className={Style.most_rex_txt}>Most Secure (Recommended)</div>
          <div className={Style.infoIcon}>
            <IoMdInformationCircleOutline />
          </div>
        </div>

        <div className={Style.secure_box}>
          <div className={Style.secure_box_secure_box}>
            <div className={Style.secure_box_securePassTxt}>
              Secure Passphrase
            </div>
            <div>Generate and safely store a unique passphrase.</div>
          </div>
          <div className={Style.secure_box_right_icon}>
            <LiaFileContractSolid />
          </div>
        </div>

        <Link
          to="/setup-passphrase-new-account"
          replace
          className={Style.secureBtnTxt}
        >
          <button>Secure My Account</button>
        </Link>
      </div>
    </div>
  );
};

export default ChooseSecurityMethod;
