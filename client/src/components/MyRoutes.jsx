import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateAccountMain from "./CreateAccountMain/CreateAccountMain";
import CreatePassword from "./CreateWallet/CreatePassword";
import Navbar from "../layout/NavBar/Navbar";
import CreateAccountContent from "./CreateWallet/CreateAccountContent/CreateAccountContent";
import ImportAccount from "./CreateWallet/ImportAccount/ImportAccount";
import RecoverSeedPhrase from "./CreateWallet/RecoverPrivateKey/RecoverPrivateKey";
import ChooseSecurityMethod from "./CreateWallet/ChooseSecurityMethod/ChooseSecurityMethod";
import SetupPassPhrase from "./CreateWallet/SetupPassPhrase/SetupPassPhrase";
import VerifyPassPhrase from "./CreateWallet/VerifyPassPhrase/VerifyPassPhrase";
import UnlockWallet from "./CreateWallet/UnlockWallet/UnlockWallet";
import ForgotPassword from "./CreateWallet/ForgotPassword/ForgotPassword";
import HomeComponent from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";
import CreateAccount from "./CreateWallet/CreateAccount/CreateAccount";
import FindAccounts from "./HomeComponent/SendComponent/FindAccounts/FindAccounts";
import SendToken from "./HomeComponent/SendComponent/SendToken/SendToken";
import ReceiveToken from "./HomeComponent/ReceiveToken/ReceiveToken";
import ImportWallet from "./CreateWallet/importWallet/importWallet";

const MyRoutes = (props) => {
  const navigate = useNavigate();
  const {
    userDetails,
    setUserDetails,
    selectedAccount,
    setSelectedAccount,
    manageUser,
    setManageuser,
  } = props;
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userData"));
    if (userDetails === null) {
      navigate("/", { replace: true });
    } else {
      if (userDetails.isWalletLock === 1) {
        navigate("/unlock-wallet", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, []);

  return (
    <div>
      {/* <Navbar
        userDetails={userDetails}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
      /> */}
      <Routes>
        <Route path="/" element={<CreateAccountMain />} />

        <Route
          path="/create"
          element={
            <CreatePassword
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route path="/create-ac" element={<CreateAccountContent />} />
        <Route
          path="/import-wallet"
          element={
            <ImportWallet
              manageUser={manageUser}
              setManageuser={setManageuser}
            />
          }
        />
        <Route path="/recover-account" element={<ImportAccount />} />
        <Route
          path="/recover-seed-phrase"
          element={<RecoverSeedPhrase userDetails={userDetails} />}
        />
        <Route
          path="/set-recovery-implicit-account"
          element={<ChooseSecurityMethod />}
        />
        <Route
          path="/setup-passphrase-new-account"
          element={<SetupPassPhrase userDetails={userDetails} />}
        />
        <Route
          path="/verify-phrase"
          element={<VerifyPassPhrase userDetails={userDetails} />}
        />
        <Route
          path="/unlock-wallet"
          element={
            <UnlockWallet
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/home"
          element={
            <HomeComponent
              userDetails={userDetails}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              setManageuser={setManageuser}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/create-account"
          element={<CreateAccount userDetails={userDetails} />}
        />

        <Route
          path="/find-accounts"
          element={<FindAccounts userDetails={userDetails} />}
        />
        <Route path="/send-token" element={<SendToken />} />
        <Route
          path="/receive-token"
          element={
            <ReceiveToken
              userDetails={userDetails}
              selectedAccount={selectedAccount}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default MyRoutes;
