import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";
import redisSession from "./redisSession";
import { default as photoRoute, default as userRoute } from "./routes";

dotenv.config();

const PORT = process.env.PORT || 4000;

const CORSconfig = {
  credentials: true,
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
};

(async () => {
  try {
    await createTypeormConn();

    const app = express();
    app.use(cors(CORSconfig));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(redisSession());
    app.use(userRoute);
    app.use(photoRoute);

    app.listen(PORT, () => {
      console.log(chalk.bgBlueBright(`server started at  http://localhost:${PORT}`));
    });
  } catch (e) {
    console.log(chalk.bgRedBright(e));
    process.exit(1);
  }
})();
