import React, { useState, useEffect } from "react";
import Style from "./CreateAccount.module.css";
import AlertComponent from "../../AlertComponent/AlertComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = (props) => {
  const navigate = useNavigate();
  const { userDetails } = props;
  const [accountName, setAccountName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });
  const handleAccountName = (e) => {
    setAccountName(e.target.value);
  };

  const addAccountName = (event) => {
    event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/wallet/addUserAccount/${userDetails.userId}`,
        { accountName }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          navigate("/home", { replace: true });
          setAccountName("");
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };
  const checkDataDisabled = () => {
    if (accountName !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
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
      {showAlert.isDisplay && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
    </div>
  );
};

export default CreateAccount;
