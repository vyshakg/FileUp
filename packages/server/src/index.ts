import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./routes";
import chalk from "chalk";
import { createTypeormConn } from "./utils/createTypeormConn";
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      bodyParser.json({
        limit: "100mb"
      })
    );

    app.use(route);
    await createTypeormConn();

    app.listen(PORT, () => {
      console.log(
        chalk.bgBlueBright(`server started at  http://localhost:${PORT}`)
      );
    });
  } catch (e) {
    console.log(chalk.bgRedBright(e));
  }
})();
