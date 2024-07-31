import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import router from "./routers/index.js";
import connectDatabase from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 8080;
connectDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
