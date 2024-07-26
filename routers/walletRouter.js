import express from "express";
import controllers from "../controllers/index.js";
const walletRouter = express.Router();

walletRouter.post("/createSeed", controllers.walletController.createSeedPhrase);
walletRouter.post(
  "/createPassword",
  controllers.walletController.createPasswordForWallet
);

export default walletRouter;
