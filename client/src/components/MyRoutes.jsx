import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAccountMain from "./CreateAccountMain/CreateAccountMain";
import CreatePassword from "./CreateWallet/CreatePassword";
import Navbar from "./NavBar/Navbar";
import CreateAccountContent from "./CreateWallet/CreateAccountContent/CreateAccountContent";
import ImportAccount from "./CreateWallet/ImportAccount/ImportAccount";
import RecoverSeedPhrase from "./CreateWallet/RecoverSeedPhrase/RecoverSeedPhrase";
import ChooseSecurityMethod from "./CreateWallet/ChooseSecurityMethod/ChooseSecurityMethod";
import SetupPassPhrase from "./CreateWallet/SetupPassPhrase/SetupPassPhrase";
import VerifyPassPhrase from "./CreateWallet/VerifyPassPhrase/VerifyPassPhrase";
import UnlockWallet from "./CreateWallet/UnlockWallet/UnlockWallet";
import ForgotPassword from "./CreateWallet/ForgotPassword/ForgotPassword";
import HomeComponent from "./HomeComponent/HomeComponent";
import Profile from "./Profile/Profile";

const MyRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateAccountMain />} />
        <Route path="/create" element={<CreatePassword />} />
        <Route path="/create-ac" element={<CreateAccountContent />} />
        <Route path="/recover-account" element={<ImportAccount />} />
        <Route path="/recover-seed-phrase" element={<RecoverSeedPhrase />} />
        <Route
          path="/set-recovery-implicit-account"
          element={<ChooseSecurityMethod />}
        />
        <Route
          path="/setup-passphrase-new-account"
          element={<SetupPassPhrase />}
        />
        <Route path="/verify-phrase" element={<VerifyPassPhrase />} />
        <Route path="/unlock-wallet" element={<UnlockWallet />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
