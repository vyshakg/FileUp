import chalk from "chalk";
import { createConnection, getConnectionOptions } from "typeorm";
export const createTypeormConn = async () => {
  try {
    const config = await getConnectionOptions("development");

    const secureConfig = {
      ...config,
      name: "default"
    };
    return createConnection(secureConfig);
  } catch (err) {
    console.log(chalk.red(err));
  }
};
