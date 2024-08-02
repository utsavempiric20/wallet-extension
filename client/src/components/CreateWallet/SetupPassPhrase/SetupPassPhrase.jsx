import React, { useState } from "react";
import Style from "./SetupPassPhrase.module.css";
import { Link } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import AlertComponent from "../../AlertComponent/AlertComponent";

const SetupPassPhrase = () => {
  const [showAlert, setShowAlert] = useState(false);
  const seedArray =
    "theory cart produce cliff toddler chief bomb oval cotton leader pelican crack";
  const diSeedArray = seedArray.split(" ");

  const handleCopy = () => {
    setShowAlert(true);
    navigator.clipboard.writeText(seedArray);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    clearTimeout();
  };

  return (
    <div className={Style.setupPassPhrase}>
      <div className={Style.setupPassPhrase_box}>
        <h2>
          Setup Your Secure <br />
          Passphrase
        </h2>
        <p>
          Write down the following words in order and keep them somewhere safe.
          <b>
            Anyone with access to it will also have access to your account!
          </b>{" "}
          You’ll be asked to verify your passphrase next.
        </p>

        <div className={Style.mainSeed_box}>
          <div className={Style.seed_twelve_box}>
            {diSeedArray.map((element, i) => (
              <div className={Style.single_seed}>
                {i + 1} {element}
              </div>
            ))}
          </div>

          <div className={Style.mainSeed_box_border}></div>

          <button className={Style.copyBtn} onClick={handleCopy}>
            <FiCopy className={Style.copyIcon} /> Copy
          </button>
        </div>

        <Link to="/verify-phrase" replace className={Style.continueBtnTxt}>
          <button>Continue</button>
        </Link>

        <Link
          to="/setup-passphrase-new-account"
          replace
          className={Style.cancelBtnTxt}
        >
          <div className={Style.cancelBtn}>Cancel</div>
        </Link>
      </div>
      {showAlert && (
        <AlertComponent type="success" message="seed copy successfully" />
      )}
    </div>
  );
};

export default SetupPassPhrase;
