import React, { useState, useEffect } from "react";
import Style from "./TokensTab.module.css";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AlertComponent from "../../../AlertComponent/AlertComponent";

const TokensTab = () => {
  const importTokenDataArray = [{ tokenName: "SepoliaEth", tokenBalance: 5 }];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [tokenData, setTokenData] = useState({
    tokenAddress: "",
    tokenSymbol: "",
    tokenDecimal: 18,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleTokenAddress = (e) => {
    const { name, value } = e.target;
    setTokenData({ ...tokenData, [name]: value });
  };

  const checkDataDisabled = () => {
    if (tokenData.tokenAddress !== "" && tokenData.tokenSymbol !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleAlert = () => {
    setDisplayAlert(true);
    setTimeout(() => {
      setDisplayAlert(false);
    }, 3000);
    clearTimeout();
  };

  const addTokenAddress = (event) => {
    event.preventDefault();
    handleClose();
    handleOpen2();
  };

  useEffect(() => {
    checkDataDisabled();
  }, [tokenData]);

  return (
    <>
      <div className={Style.tokenTab}>
        <div className={Style.tokenTab_box}>
          {importTokenDataArray.map((element, i) => (
            <div className={Style.tokenTab_list_box} key={i}>
              <div className={Style.token_icon_box}>
                <div className={Style.icon_box}>
                  <div className={Style.icon_txt}>U</div>
                </div>
                <div className={Style.token_txt_box}>
                  <div className={Style.toke_big_txt}>{element.tokenName}</div>
                  <div className={Style.toke_small_txt}>
                    {element.tokenName}
                  </div>
                </div>
              </div>
              <div className={Style.tokenPriceTxt}>
                {element.tokenBalance} {element.tokenName}
              </div>
            </div>
          ))}

          <div className={Style.import_token_box} onClick={handleOpen}>
            <IoMdAdd className={Style.add_icon} /> Import Tokens
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              // width: "27%",
            },
          },
        }}
      >
        <DialogTitle className={Style.dialogTitle}>Import tokens</DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => addTokenAddress(event)}>
            <div className={Style.manualImportTokensTextField}>
              <div className="mb-3">
                <label htmlFor="seedPhrase_input">Token Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="tokenAddress"
                  id="tokenAddress_input"
                  placeholder="Enter token Address"
                  value={tokenData.tokenAddress}
                  onChange={handleTokenAddress}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="seedPhrase_input">Token symbol</label>
                <input
                  type="text"
                  className="form-control"
                  name="tokenSymbol"
                  id="tokenSymbol_input"
                  placeholder="Enter token Address"
                  value={tokenData.tokenSymbol}
                  onChange={handleTokenAddress}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="seedPhrase_input">Token Decimal</label>
                <input
                  type="text"
                  className="form-control"
                  name="tokenDecimal"
                  id="tokenDecimal_input"
                  placeholder="Enter token Address"
                  value={tokenData.tokenDecimal}
                  onChange={handleTokenAddress}
                />
              </div>
            </div>
            <Box className={Style.bottomBtnComponent}>
              <button
                className={Style.nextBtn}
                type="submit"
                disabled={isDisabled}
              >
                Next
              </button>
            </Box>
            {displayAlert && <AlertComponent type="error" message="Token A" />}
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "27%",
            },
          },
        }}
      >
        <DialogTitle className={Style.dialogTitle}>Import tokens</DialogTitle>
        <DialogContent>
          <div className={Style.subTitleTxt}>
            Would you like to import these tokens?
          </div>
          <div className={Style.tokenTab_dialog2_list_box}>
            <div className={Style.token_icon_box}>
              <div className={Style.icon_box}>
                <div className={Style.icon_txt}>U</div>
              </div>
              <div className={Style.token_txt_box}>
                <div className={Style.toke_big_txt}>SepoliaEth</div>
                <div className={Style.toke_small_txt}>2 SepoliaEth</div>
              </div>
            </div>
          </div>
          <Box className={Style.bottomBtnDialog2Component}>
            <button
              className={Style.backBtn}
              onClick={() => {
                handleClose2();
                handleOpen();
              }}
            >
              Back
            </button>
            <button className={Style.nextBtn}>Import</button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TokensTab;
