import express from "express";
import controllers from "../controllers/index.js";
const networkRouter = express.Router();

networkRouter.post("/addNetwork", controllers.networkController.addNetwork);

networkRouter.get("/getNetwork", controllers.networkController.getNetwork);

networkRouter.get(
  "/getAllNetwork",
  controllers.networkController.getAllNetwork
);
networkRouter.post(
  "/updateNetwork",
  controllers.networkController.updateNetwork
);
networkRouter.post(
  "/deleteNetwork",
  controllers.networkController.deleteNetwork
);

export default networkRouter;
