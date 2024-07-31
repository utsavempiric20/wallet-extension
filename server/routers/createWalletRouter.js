import express from "express";
import createWalletController from "../controllers/createWalletController.js";
const createWalletRouter = express.Router();

createWalletRouter.post(
  "/createWallet",
  createWalletController.createPasswordForWallet
);

createWalletRouter.post(
  "/checkSeedPhrase/:id",
  createWalletController.checkSeedPhrase
);

createWalletRouter.get(
  "/getAccountDetails",
  createWalletController.getAccountDetails
);

createWalletRouter.get(
  "/getAllAccounts/:id",
  createWalletController.getAllAccounts
);

createWalletRouter.post(
  "/addUserAccount/:id",
  createWalletController.addUserAccount
);

createWalletRouter.post(
  "/revealSecretData",
  createWalletController.revealSecretData
);

createWalletRouter.post(
  "/forgotPassword",
  createWalletController.forgotPassword
);

createWalletRouter.post("/importWallet", createWalletController.importWallet);

createWalletRouter.post("/importAccount", createWalletController.importAccount);

createWalletRouter.post(
  "/lockAndUnlockWallet",
  createWalletController.lockAndUnlockWallet
);

export default createWalletRouter;
