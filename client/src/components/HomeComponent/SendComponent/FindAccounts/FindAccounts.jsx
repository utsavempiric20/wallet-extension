import React, { useState, useEffect } from "react";
import Style from "./FindAccounts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";

const FindAccounts = (props) => {
  const { userDetails } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const accountAvatarName = (name) => {
    const singleChar = name.charAt(0);
    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      if (char >= "0" && char <= "9") {
        return singleChar + char;
      }
    }
    return null;
  };

  const truncateAddress = (address) => {
    if (address.length <= 10) return address;

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const filterItems = accountData.filter((item) =>
    item.address.includes(search)
  );

  const getAllAccounts = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/wallet/getAllAccounts/${userDetails.userId}`
      )
      .then((res) => {
        setAccountData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const handleSelectedItem = (adddress, event = null) => {
    if (event && event.key === "Enter") {
      navigate(`/send-token/${adddress}`);
    } else if (!event) {
      navigate(`/send-token/${adddress}`);
    }
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={Style.findAccount}>
          <div className={Style.findAccounts_box}>
            <div className={Style.leftIconBox}>
              <div className={Style.back_icon} onClick={handleGoBack}>
                <MdOutlineArrowBackIos />
              </div>
              <h3>Send to</h3>
            </div>

            <div className={Style.search_box_seed}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  minLength="12"
                  id="seedPhrase_input"
                  placeholder="Enter public address(0x)"
                  value={search}
                  onChange={handleSearch}
                  onKeyDown={(event) => handleSelectedItem(search, event)}
                />
              </div>
            </div>
            <div className={Style.yourAccountTxt}>Your Accounts</div>
            {filterItems.map((element, i) => (
              <div
                className={Style.accounts_list_box}
                key={i}
                onClick={() => handleSelectedItem(element.address)}
              >
                <div className={Style.token_icon_box}>
                  <div className={Style.token_icon_mini_box}>
                    <div className={Style.icon_box}>
                      <div className={Style.icon_txt}>
                        {accountAvatarName(element.accountName)}
                      </div>
                    </div>
                    <div className={Style.token_txt_box}>
                      <div className={Style.toke_big_txt}>
                        {element.accountName}
                      </div>
                      <div className={Style.toke_small_txt}>
                        {truncateAddress(element.address)}
                      </div>
                    </div>
                  </div>

                  <div className={Style.tokenPrice_box}>
                    <div className={Style.tokenPriceTxt}>
                      {element.balance} SepoliaEth
                    </div>
                    <div className={Style.tokenSmall_PriceTxt}>
                      {element.balance} SepoliaEth
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FindAccounts;
