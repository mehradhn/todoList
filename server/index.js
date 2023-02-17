import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helemt from "helmet";
import morgan from "morgan";
import todesRoutes from "./routes/todoes.js";
//CONFIGURATIONS

dotenv.config(); //for setup enviroment
const app = express();
app.use(express.json());
app.use(helemt());
app.use(helemt.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTE
app.use("/todoes", todesRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
  })
  .catch((error) => console.log("Hashemi? Hashemi nadarim inja!"));
