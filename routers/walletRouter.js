import express from "express";
import controllers from "../controllers/index.js";
const walletRouter = express.Router();

walletRouter.post("/createSeed", controllers.walletController.createWallet);
walletRouter.post(
  "/createPassword",
  controllers.walletController.createPasswordForWallet
);

export default walletRouter;
