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
let FRONTEND_HOST = process.env.FRONTEND_HOST
let PORT = process.env.PORT || 4000;
export const app = express();

export const startServer = async () => {
  const CORSconfig = {
    origin: FRONTEND_HOST,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }
  if (process.env.NODE_ENV === "test") {
    // await redis.flushall();
    PORT = 0;
    console.log = () => null;
  }

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
startServer().catch(err => console.log(chalk.bgRedBright(err)));
