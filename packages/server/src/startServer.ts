import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";
import redisSession, { redis } from "./redisSession";
import { default as photoRoute, default as userRoute } from "./routes";
import upgradeRoute from "./routes/upgrade";
import { testConnection } from "./test/testDatabaseConnection";

dotenv.config();

const port = process.env.PORT || 4000;
export const app = express();

export const startServer = async () => {
  const CORSconfig = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? (process.env.FRONTEND_HOST as string)
        : process.env.NODE_ENV === "test"
        ? "*"
        : "http://localhost:3000"
  };

  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  if (process.env.NODE_ENV === "test") {
    await testConnection(true);
  } else {
    await createTypeormConn();
  }

  app.use(cors(CORSconfig));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(redisSession());
  app.use(userRoute);
  app.use(photoRoute);
  app.use(upgradeRoute);

  const PORT = process.env.NODE_ENV === "test" ? 0 : port;

  const server = app.listen(PORT, () => {
    console.log(chalk.bgBlueBright(`server started at  http://localhost:${PORT}`));
  });

  return { app, server };
};
