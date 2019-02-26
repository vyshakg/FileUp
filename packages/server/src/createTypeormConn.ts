import chalk from "chalk";
import { createConnection, getConnectionOptions } from "typeorm";
import { Photo } from "./entity/photo";
import { User } from "./entity/User";
export const createTypeormConn = async () => {
  try {
    const config = await getConnectionOptions(process.env.NODE_ENV);

    const proConfig = {
      ...config,
      url: process.env.DATABASE_URL,
      entities: [User, Photo],
      name: "default"
    };

    const devConfig = {
      ...config,
      name: "default"
    };
    const secureConfig = process.env.NODE_ENV === "production" ? proConfig : devConfig;
    return createConnection(secureConfig);
  } catch (err) {
    console.log(chalk.red(err));
  }
};
