import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";
import redisSession from "./redisSession";
import { default as photoRoute, default as userRoute } from "./routes";
import upgradeRoute from "./routes/upgrade";

dotenv.config();

let PORT = process.env.PORT || 4000;
export const app = express();

export const startServer = async () => {
  const CORSconfig = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? "same-origin"
        : process.env.NODE_ENV === "test"
        ? "*"
        : process.env.FRONTEND_HOST
  };

  if (process.env.NODE_ENV === "test") {
    // await redis.flushall();
    PORT = 0;
    console.log = () => null;
  }

  if (!(process.env.NODE_ENV === "test")) {
    await createTypeormConn();
  }

  app.use(express.static(path.join(__dirname, "./view")));
  app.use(cors(CORSconfig));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(redisSession());
  app.use(userRoute);
  app.use(photoRoute);
  app.use(upgradeRoute);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/index.html"));
  });

  const server = app.listen(PORT, () => {
    console.log(chalk.bgBlueBright(`server started at  http://localhost:${PORT}`));
  });
};
startServer().catch(err => console.log(chalk.bgRedBright(err)));
