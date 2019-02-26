import { testDatabaseConnection } from "./testDatabaseConnection";

testDatabaseConnection(true).then(() => process.exit());
