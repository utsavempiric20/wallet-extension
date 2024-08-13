import React, { useState, useEffect } from "react";
import Style from "./HomePage.module.css";
import { BsSend } from "react-icons/bs";
import { PiArrowElbowLeftDownBold } from "react-icons/pi";
import { IoMdSwap } from "react-icons/io";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Tab,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import TokensTab from "../../components/HomeComponent/HomeTabs/TokensTab/TokensTab";
import ActivityTab from "../../components/HomeComponent/HomeTabs/ActivityTab/ActivityTab";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { TfiImport } from "react-icons/tfi";
import { FiCopy } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";
import { IoCopy } from "react-icons/io5";

const HomeComponent = (props) => {
  const { userDetails, selectedAccount, setSelectedAccount, setManageuser } =
    props;
  const navigate = useNavigate();
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
    // {
    //   name: "Account1",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account2",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account3",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account4",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account5",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account6",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account7",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account8",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account9",
    //   accountAddress: "0x490C31...e33AcA",
    // },
    // {
    //   name: "Account10",
    //   accountAddress: "0x490C31...e33AcA",
    // },
  ]);
  const [loading, setLoading] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [showAlert, setShowAlert] = useState({
    message: "",
    type: "",
    isDisplay: false,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterItems = accountData.filter((item) =>
    item.accountName.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleSelectedAccount = (item) => {
    localStorage.setItem("userAccount", JSON.stringify(item));
    const accountData = JSON.parse(localStorage.getItem("userAccount"));
    if (accountData) {
      setSelectedAccount(accountData);
      fetchBalance();
    }
    handleClose();
  };

  const getAllAccounts = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/wallet/getAllAccounts/${userDetails.userId}`
      )
      .then((res) => {
        setAccountData(res.data.data);
        if (selectedAccount != null) {
          setSelectedAccount(selectedAccount);
        } else {
          setSelectedAccount(res.data.data[0]);
        }
        fetchBalance();
        localStorage.setItem("userAccount", JSON.stringify(res.data.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const fetchBalance = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/wallet/fetchUserBalance`, {
        address: selectedAccount.address,
      })
      .then((res) => {
        localStorage.setItem(
          "userAccount",
          JSON.stringify({ ...selectedAccount, balance: res.data.data })
        );
        setManageuser(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImportAccount = () => {
    navigate("/recover-seed-phrase");
    handleClose();
  };

  const handelCreateAccount = () => {
    navigate("/create-account");
    handleClose();
  };

  const handleAlert = (message, type, isDisplay) => {
    setShowAlert({ message, type, isDisplay });
    setTimeout(() => {
      setShowAlert({ message: "", type: "", isDisplay: false });
    }, 4000);
    clearTimeout();
  };

  const handleLockWallet = () => {
    const userData = {
      userId: userDetails.userId,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/wallet/lockAndUnlockWallet`,
        userData
      )
      .then((res) => {
        if (res.data.success === 1) {
          navigate("/unlock-wallet", { replace: true });
          const seedData = JSON.parse(localStorage.getItem("userData"));
          if (seedData) {
            const updatedData = { ...seedData, isWalletLock: 1 };
            localStorage.setItem("userData", JSON.stringify(updatedData));
            setSelectedAccount(null);
          }
          handleClose();
        }
      })
      .catch((error) => {
        handleAlert(error.response.data.data, "error", true);
        console.log(error);
      });
  };

  const truncateAddress = (address) => {
    if (address.length <= 10) return address;

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateAddress2 = (address) => {
    if (address.length <= 10) return address;

    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  useEffect(() => {
    getAllAccounts();
    selectedAccount && fetchBalance();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={Style.homeMainDiv}>
          <div className={Style.home_box}>
            <div className={Style.account_dropShadowBox}>
              <div className={Style.account_dropMainBox}>
                <div className={Style.accounts_dropDown} onClick={handleOpen}>
                  <div className={Style.accounts_dropDown_icon_box}>
                    <div className={Style.icon_txt}>
                      {selectedAccount &&
                        accountAvatarName(selectedAccount.accountName)}
                    </div>
                  </div>
                  <h5>{selectedAccount && selectedAccount.accountName}</h5>
                  <div className={Style.down_iconBox}>
                    <FaChevronDown />
                  </div>
                </div>

                <div className={Style.verIcon} onClick={handleOpen2}>
                  <MdMoreVert />
                </div>
              </div>
              <div className={Style.address_AccountBox}>
                <div className={Style.address_AccountBox_Txt}>
                  {truncateAddress(selectedAccount.address)}
                </div>
                <FiCopy
                  className={Style.address_AccountBox_copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(selectedAccount.address);
                  }}
                />
              </div>
            </div>

            <h1>{selectedAccount && selectedAccount.balance} SepoliaEth</h1>
            <div className={Style.home_box_three_item}>
              {iconsArray.map((element, i) => {
                return (
                  <Link
                    to={element.path}
                    className={Style.icons_link_txt}
                    key={i}
                  >
                    <div className={Style.icon_main_box} key={i}>
                      <div className={Style.icon_box}>{element.icon}</div>
                      <div className={Style.sendIcon_txt}>
                        {element.iconTxt}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Box
              className="tabComponent"
              sx={{
                "& .MuiTabPanel-root": { padding: "0px" },
                marginTop: "20px",
              }}
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
                    {filterItems?.map((element, i) => (
                      <div
                        className={Style.accounts_list_box}
                        key={i}
                        onClick={() => handleSelectedAccount(element)}
                      >
                        <div className={Style.send_confirm_box}>
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
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={open2}
              onClose={handleClose2}
              sx={{
                "& .MuiBackdrop-root": {
                  backgroundColor: "transparent",
                },
                " & .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    position: "absolute",
                    top: "0",
                    right: "0px",
                    width: "320px",
                    height: "380px",
                  },
                },
              }}
              className={Style.dialogMain}
            >
              <DialogTitle className={Style.dialogTitle}>
                {selectedAccount && selectedAccount.accountName}
              </DialogTitle>
              <DialogContent>
                <Box className={Style.passphrase_box}>
                  <div className={Style.secure_box}>
                    <div className={Style.secure_box_accountNum_txt}>
                      {selectedAccount &&
                        truncateAddress2(selectedAccount.address)}
                    </div>

                    <FiCopy
                      className={Style.secure_box_copy_icon}
                      onClick={() =>
                        navigator.clipboard.writeText(selectedAccount.address)
                      }
                    />
                  </div>

                  <button
                    className={Style.findAccountCBtn}
                    onClick={handleImportAccount}
                  >
                    <TfiImport />
                    Import Account
                  </button>

                  <button
                    className={Style.copyBtn}
                    onClick={handelCreateAccount}
                  >
                    <FaPlus className={Style.copyIcon} /> Create New Account
                  </button>
                  <button
                    className={Style.findAccountCBtn}
                    onClick={handleLockWallet}
                  >
                    <IoIosLock />
                    Lock Wallet
                  </button>
                </Box>
                <Box className={Style.bottomBtnComponent}></Box>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeComponent;
