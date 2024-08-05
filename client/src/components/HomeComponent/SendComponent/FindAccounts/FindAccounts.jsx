import React, { useState } from "react";
import Style from "./FindAccounts.module.css";
import { useNavigate } from "react-router-dom";

const FindAccounts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [accountData, setAccountData] = useState([
    {
      name: "Account1",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account2",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account3",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account4",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account5",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account6",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account7",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account8",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account9",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
    {
      name: "Account10",
      accountAddress: "0x490C3174463af66567a9d0B16FdbF9019De33AcA",
    },
  ]);
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

  return (
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
        {accountData.map((element, i) => (
          <div
            className={Style.accounts_list_box}
            key={i}
            onClick={() => navigate("/send-token")}
          >
            <div className={Style.token_icon_box}>
              <div className={Style.icon_box}>
                <div className={Style.icon_txt}>
                  {accountAvatarName(element.name)}
                </div>
              </div>
              <div className={Style.token_txt_box}>
                <div className={Style.toke_big_txt}>{element.name}</div>
                <div className={Style.toke_small_txt}>
                  {element.accountAddress}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindAccounts;
