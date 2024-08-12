import React, { useState, useEffect } from "react";
import Style from "./SetupPassPhrase.module.css";
import { Link } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import AlertComponent from "../../AlertComponent/AlertComponent";
import CircularProgress from "@mui/material/CircularProgress";

const SetupPassPhrase = (props) => {
  const { userDetails, setUserDetails } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [seedData, setSeedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSeedData = () => {
    setLoading(true);
    // const seedData = JSON.parse(localStorage.getItem("userData"));
    if (userDetails) {
      setSeedData(userDetails.seed.split(" "));
    }

    // setUserDetails({
    //   userId: seedData._id,
    //   isWalletLock: seedData.isWalletLock,
    //   seed: seedData.seed,
    // });
    setLoading(false);
  };

  const handleCopy = () => {
    setShowAlert(true);
    navigator.clipboard.writeText(userDetails.seed);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    clearTimeout();
  };

  useEffect(() => {
    console.log("userDetails setupPass", userDetails);
    getSeedData();
  }, [userDetails]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={Style.setupPassPhrase}>
          <div className={Style.setupPassPhrase_box}>
            <h2>
              Setup Your Secure <br />
              Passphrase
            </h2>
            <p>
              Write down the following words in order and keep them somewhere
              safe.
              <b>
                Anyone with access to it will also have access to your account!
              </b>{" "}
              You’ll be asked to verify your passphrase next.
            </p>

            <div className={Style.mainSeed_box}>
              <div className={Style.seed_twelve_box}>
                {seedData.map((element, i) => (
                  <div className={Style.single_seed} key={i + 1}>
                    {i + 1} {element}
                  </div>
                ))}
              </div>

              <div className={Style.mainSeed_box_border}></div>
              <Link
                to="/verify-phrase"
                replace
                className={Style.continueBtnTxt}
              >
                <button onClick={handleCopy}>Copy & Continue</button>
              </Link>
              {/* <button className={Style.copyBtn} onClick={handleCopy}>
                <FiCopy className={Style.copyIcon} /> Copy
              </button> */}
            </div>

            {/* <Link to="/verify-phrase" replace className={Style.continueBtnTxt}>
              <button>Continue</button>
            </Link> */}

            {/* <Link
              to="/setup-passphrase-new-account"
              replace
              className={Style.cancelBtnTxt}
            >
              <div className={Style.cancelBtn}>Cancel</div>
            </Link> */}
          </div>
          {showAlert && (
            <AlertComponent type="success" message="seed copy successfully" />
          )}
        </div>
      )}
    </>
  );
};

export default SetupPassPhrase;
