"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.testDatabaseConnection = (drop = false) => {
    return typeorm_1.createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "admin",
        database: "fileup-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/*.*"]
    });
};
//# sourceMappingURL=testDatabaseConnection.js.map