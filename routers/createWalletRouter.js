import express from "express";
import controllers from "../controllers/index.js";
const createWalletRouter = express.Router();

createWalletRouter.post(
  "/createPassword",
  controllers.createWalletController.createPasswordForWallet
);

createWalletRouter.post(
  "/createSeedPhrase/:id",
  controllers.createWalletController.createSeedPhrase
);

createWalletRouter.post(
  "/checkSeedPhrase/:id",
  controllers.createWalletController.checkSeedPhrase
);

createWalletRouter.post(
  "/assignChainAndAccount",
  controllers.createWalletController.assignChainAndAccount
);

createWalletRouter.get(
  "/getAccountDetails",
  controllers.createWalletController.getAccountDetails
);

createWalletRouter.get(
  "/getAllAccounts/:id",
  controllers.createWalletController.getAllAccounts
);

createWalletRouter.post(
  "/addUserAccount/:id",
  controllers.createWalletController.addUserAccount
);

export default createWalletRouter;
