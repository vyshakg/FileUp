"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const typeorm_1 = require("typeorm");
const photo_1 = require("./entity/photo");
const User_1 = require("./entity/User");
exports.createTypeormConn = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const config = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV);
        const proConfig = Object.assign({}, config, { url: process.env.DATABASE_URL, entities: [User_1.User, photo_1.Photo], name: "default" });
        const devConfig = Object.assign({}, config, { name: "default" });
        const secureConfig = process.env.NODE_ENV === "production" ? proConfig : devConfig;
        return typeorm_1.createConnection(secureConfig);
    }
    catch (err) {
        console.log(chalk_1.default.red(err));
    }
});
//# sourceMappingURL=createTypeormConn.js.map