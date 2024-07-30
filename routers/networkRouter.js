import express from "express";
import networkController from "../controllers/networkController.js";
const networkRouter = express.Router();

networkRouter.post("/addNetwork", networkController.addNetwork);

networkRouter.get("/getNetwork", networkController.getNetwork);

networkRouter.get("/getAllNetwork", networkController.getAllNetwork);
networkRouter.post("/updateNetwork", networkController.updateNetwork);
networkRouter.post("/deleteNetwork", networkController.deleteNetwork);

export default networkRouter;
