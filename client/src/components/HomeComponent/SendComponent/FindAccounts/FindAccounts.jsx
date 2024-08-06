import React, { useState, useEffect } from "react";
import Style from "./FindAccounts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const FindAccounts = (props) => {
  const { userDetails } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
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

  const filterItems = accountData.filter((item) =>
    item.accountName.toLowerCase().includes(search.toLowerCase())
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
            <h3>Send to</h3>
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
                />
              </div>
            </div>
            <div className={Style.yourAccountTxt}>Your Accounts</div>
            {filterItems.map((element, i) => (
              <div
                className={Style.accounts_list_box}
                key={i}
                onClick={() => navigate("/send-token")}
              >
                <div className={Style.token_icon_box}>
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
                      {element.address}
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
