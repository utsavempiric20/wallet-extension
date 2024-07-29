import express from "express";
import createWalletRouter from "./createWalletRouter.js";
import networkRouter from "./networkRouter.js";
const router = express.Router();

router.use("/wallet", createWalletRouter);
router.use("/network", networkRouter);

export default router;
