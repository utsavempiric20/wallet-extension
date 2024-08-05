import React, { useState } from "react";
import Style from "./SendToken.module.css";
import { useNavigate } from "react-router-dom";

const SendToken = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <div className={Style.senToken}>
      <div className={Style.senToken_box}>
        <h3>Send</h3>
        <div className={Style.accountName_box}>
          <div className={Style.accountNameTxt}>Account 1</div>
          <div className={Style.accountAddress_txt}>
            0x96d590a01e2954124d30f9c29e32ba0fe29d89ui
          </div>
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
          <button
            className={Style.cancelBtn}
            onClick={() => navigate("/find-accounts")}
          >
            Cancel
          </button>
          <button className={Style.nextBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SendToken;
