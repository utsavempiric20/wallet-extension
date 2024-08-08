import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./components/MyRoutes";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TestComponent from "./components/TestComponent";

function App() {
  const [userDetails, setUserDetails] = useState({
    userId: "",
    isWalletLock: "",
    seed: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [manageUser, setManageuser] = useState(false);

  const getUserDetails = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserDetails({
        userId: userData._id,
        isWalletLock: userData.isWalletLock,
        seed: userData.seed,
      });
    }
  };

  const getAccountDetails = () => {
    const accountData = JSON.parse(localStorage.getItem("userAccount"));
    if (accountData) {
      setSelectedAccount(accountData);
    }
  };

  useEffect(() => {
    getUserDetails();
    getAccountDetails();
    setLoading(false);
  }, [manageUser]);

  return (
    <>
      {/* <TestComponent /> */}
      {loading ? (
        <center>
          <CircularProgress />
        </center>
      ) : (
        <div className="App">
          <Router>
            <MyRoutes
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              manageUser={manageUser}
              setManageuser={setManageuser}
            />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
