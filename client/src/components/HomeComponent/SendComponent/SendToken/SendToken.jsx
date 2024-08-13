import React, { useState } from "react";
import Style from "./SendToken.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from "axios";
import AlertComponent from "../../../AlertComponent/AlertComponent";
import { CircularProgress } from "@mui/material";

const SendToken = (props) => {
  const { selectedAccount } = props;
  const navigate = useNavigate();
  const { address } = useParams();
  const [amount, setAmount] = useState(0);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 4000);
    clearTimeout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const sendData = {
      fromAddress: selectedAccount.address,
      toAddress: address,
      amount: amount,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/wallet/sendTransaction`, sendData)
      .then((res) => {
        if (res.data.success == 1) {
          navigate(-2);
        }
      })
      .catch((error) => {
        console.log(error);
        handleAlert(error.response.data.data, "error", true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className={Style.loader}>
          <CircularProgress />
        </div>
      )}
      <div className={isLoading ? Style.contentDisabled : Style.senToken}>
        <div className={Style.senToken_box}>
          <div className={Style.leftIconBox}>
            <div className={Style.back_icon} onClick={handleGoBack}>
              <MdOutlineArrowBackIos />
            </div>
            <h3>Send</h3>
          </div>

          <div className={Style.accountName_box}>
            <div className={Style.accountAddress_txt}>{address && address}</div>
          </div>

          <div className={Style.amount_box}>
            <div className={Style.amountTxt}>Asset:</div>
            <div className={Style.tokens_list_box}>
              <div className={Style.token_icon_box}>
                <div className={Style.icon_box}>
                  <div className={Style.icon_txt}>S</div>
                </div>
                <div className={Style.token_txt_box}>
                  <div className={Style.toke_big_txt}>SepoliaETH</div>
                  <div className={Style.toke_small_txt}>
                    Balance: 0.002 SepoliaETH
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={Style.amount_box}>
            <div className={Style.amountTxt}>Amount:</div>
            <div className={Style.amount_box_seed}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  minLength="12"
                  id="amount_input"
                  placeholder="enter amount"
                  value={amount}
                  onChange={handleAmount}
                />
              </div>
            </div>
          </div>

          <div className={Style.bottomBtnComponent}>
            <button className={Style.cancelBtn} onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className={Style.nextBtn} onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
        {showAlert.isDisplay && (
          <AlertComponent type={showAlert.type} message={showAlert.message} />
        )}
      </div>
    </>
  );
};

export default SendToken;
