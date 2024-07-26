import express from "express";
import walletRouter from "./walletRouter.js";
const router = express.Router();

router.use("/wallet", walletRouter);

export default router;
