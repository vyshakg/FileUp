import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";
import redisSession from "./redisSession";
import { default as photoRoute, default as userRoute } from "./routes";
import upgradeRoute from "./routes/upgrade";

dotenv.config();

const PORT = process.env.PORT || 4000;

const CORSconfig = {
  credentials: true,
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
};
export const app = express();

const startServer = async () => {
  if (!(process.env.NODE_ENV === "test")) {
    await createTypeormConn();
  }

  app.use(cors(CORSconfig));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(redisSession());
  app.use(userRoute);
  app.use(photoRoute);
  app.use(upgradeRoute);

  app.listen(PORT, () => {
    console.log(chalk.bgBlueBright(`server started at  http://localhost:${PORT}`));
  });
};

startServer().catch(e => console.log(chalk.bgRedBright(e)));
