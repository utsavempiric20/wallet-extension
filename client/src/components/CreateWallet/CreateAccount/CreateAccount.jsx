import React, { useState, useEffect } from "react";
import Style from "./CreateAccount.module.css";
import AlertComponent from "../../AlertComponent/AlertComponent";

const CreateAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleAccountName = (e) => {
    setAccountName(e.target.value);
  };

  const addAccountName = (event) => {
    event.preventDefault();
    handleAlert();
  };
  const checkDataDisabled = () => {
    if (accountName !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleAlert = () => {
    setDisplayAlert(true);
    setTimeout(() => {
      setDisplayAlert(false);
    }, 4000);
    clearTimeout();
  };

  useEffect(() => {
    checkDataDisabled();
  }, [accountName]);

  return (
    <div className={Style.createAccount}>
      <div className={Style.createAccount_box}>
        <h2>Add a Account Name</h2>
        <p>
          Enter an Account Name to use with your BLUESKY account. Your Account
          Name will be used for all BLUESKY operations, including sending and
          receiving assets.
        </p>

        <div className={Style.recoverSeedPhrase_box_seed}>
          <div className="mb-3">
            <label htmlFor="accountName_input">Account Name</label>
            <input
              type="text"
              className="form-control"
              name="accountName"
              minLength="12"
              id="accountName_input"
              placeholder="Enter account name"
              value={accountName}
              onChange={handleAccountName}
            />
          </div>
        </div>

        <button
          className={Style.nextBtn}
          disabled={isDisabled}
          onClick={addAccountName}
        >
          Create Account
        </button>
      </div>
      {displayAlert && (
        <AlertComponent type="error" message="Account Not created" />
      )}
    </div>
  );
};

export default CreateAccount;
