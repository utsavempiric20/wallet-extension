import React, { useState } from "react";
import Style from "./HomePage.module.css";
import { BsSend } from "react-icons/bs";
import { PiArrowElbowLeftDownBold } from "react-icons/pi";
import { IoMdSwap } from "react-icons/io";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TokensTab from "../../components/HomeComponent/HomeTabs/TokensTab/TokensTab";
import ActivityTab from "../../components/HomeComponent/HomeTabs/ActivityTab/ActivityTab";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const HomeComponent = () => {
  const iconsArray = [
    {
      icon: <BsSend className={Style.sendIcon} />,
      iconTxt: "Send",
      path: "/find-accounts",
    },
    {
      icon: <PiArrowElbowLeftDownBold className={Style.sendIcon} />,
      iconTxt: "Receive",
      path: "/receive-token",
    },
    {
      icon: <IoMdSwap className={Style.sendIcon} />,
      iconTxt: "Swap",
      path: "/swap-tokens",
    },
  ];

  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [search, setSearch] = useState("");
  const [accountData, setAccountData] = useState([
    {
      name: "Account1",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account2",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account3",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account4",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account5",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account6",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account7",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account8",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account9",
      accountAddress: "0x490C31...e33AcA",
    },
    {
      name: "Account10",
      accountAddress: "0x490C31...e33AcA",
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

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <div className={Style.homeMainDiv}>
      <div className={Style.home_box}>
        <div className={Style.accounts_dropDown} onClick={handleOpen}>
          <div className={Style.accounts_dropDown_icon_box}>
            <div className={Style.icon_txt}>A1</div>
          </div>
          <h5>Account 1</h5>
          <FaChevronDown />
        </div>

        <h1>$0 USD</h1>
        <div className={Style.home_box_three_item}>
          {iconsArray.map((element, i) => {
            return (
              <Link to={element.path} className={Style.icons_link_txt}>
                <div className={Style.icon_main_box} key={i}>
                  <div className={Style.icon_box}>{element.icon}</div>
                  <div className={Style.sendIcon_txt}>{element.iconTxt}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Box
          className="tabComponent"
          sx={{ "& .MuiTabPanel-root": { padding: "0px" }, marginTop: "20px" }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                indicatorColor="primary"
                onChange={handleChange}
                variant="fullWidth"
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Tokens"
                  className="tabLabelTxt"
                  value="1"
                  sx={{ fontWeight: "600" }}
                />
                <Tab
                  label="Activity"
                  className="tabLabelTxt"
                  value="2"
                  sx={{ fontWeight: "600" }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TokensTab />
            </TabPanel>
            <TabPanel
              value="2"
              sx={{ ".MuiTabPanel-root": { padding: "0px" } }}
            >
              <ActivityTab />
            </TabPanel>
          </TabContext>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
              },
            },
          }}
          className={Style.dialogMain}
        >
          <DialogTitle className={Style.dialogTitle}>
            Select Account
          </DialogTitle>
          <DialogContent>
            <div className={Style.findAccount}>
              <div className={Style.findAccounts_box}>
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
                    // onClick={() => navigate("/send-token")}
                  >
                    <div className={Style.send_confirm_box}>
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

                    <div className={Style.tokenPrice_box}>
                      <div className={Style.tokenPriceTxt}>-2 USD</div>
                      <div className={Style.tokenSmall_PriceTxt}>-2 USD</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HomeComponent;
