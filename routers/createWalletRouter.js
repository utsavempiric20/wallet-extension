import express from "express";
import createWalletController from "../controllers/createWalletController.js";
const createWalletRouter = express.Router();

createWalletRouter.post(
  "/createPassword",
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

export default createWalletRouter;
