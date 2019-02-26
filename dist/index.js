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
const body_parser_1 = __importDefault(require("body-parser"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const createTypeormConn_1 = require("./createTypeormConn");
const redisSession_1 = __importDefault(require("./redisSession"));
const routes_1 = __importDefault(require("./routes"));
const upgrade_1 = __importDefault(require("./routes/upgrade"));
dotenv_1.default.config();
let PORT = process.env.PORT || 4000;
exports.app = express_1.default();
exports.startServer = () => __awaiter(this, void 0, void 0, function* () {
    const CORSconfig = {
        credentials: true,
        origin: process.env.NODE_ENV === "production"
            ? "same-origin"
            : process.env.NODE_ENV === "test"
                ? "*"
                : process.env.FRONTEND_HOST
    };
    if (process.env.NODE_ENV === "test") {
        PORT = 0;
        console.log = () => null;
    }
    if (!(process.env.NODE_ENV === "test")) {
        yield createTypeormConn_1.createTypeormConn();
    }
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, "./view")));
    exports.app.use(cors_1.default(CORSconfig));
    exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
    exports.app.use(body_parser_1.default.json());
    exports.app.use(redisSession_1.default());
    exports.app.use(routes_1.default);
    exports.app.use(routes_1.default);
    exports.app.use(upgrade_1.default);
    exports.app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "./view/index.html"));
    });
    const server = exports.app.listen(PORT, () => {
        console.log(chalk_1.default.bgBlueBright(`server started at  http://localhost:${PORT}`));
    });
});
exports.startServer().catch(err => console.log(chalk_1.default.bgRedBright(err)));
//# sourceMappingURL=index.js.map