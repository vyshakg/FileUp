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
const bcryptjs_1 = require("bcryptjs");
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const User_1 = require("../entity/User");
const formatError_1 = __importDefault(require("../utils/formatError"));
const validation_1 = require("../validation");
const isAuthenticated_1 = __importDefault(require("./middleware/isAuthenticated"));
const userRoute = express_1.default.Router();
userRoute.post("/api/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        yield joi_1.default.validate({ username, email, password }, validation_1.signUp, { abortEarly: false });
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            const hashPassword = yield bcryptjs_1.hash(password, 10);
            let newUser = User_1.User.create({
                username,
                email,
                password: hashPassword
            });
            newUser = yield newUser.save();
            req.session.userId = newUser.id;
            return res.status(200).json({
                ok: true,
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                planType: newUser.planType
            });
        }
        else {
            return res.status(401).json([{ path: "email", message: "Email already exists" }]);
        }
    }
    catch (e) {
        return res.status(401).json(formatError_1.default(e));
    }
}));
userRoute.post("/api/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        yield joi_1.default.validate({ email, password }, validation_1.signIn, { abortEarly: false });
        const user = yield User_1.User.findOne({ email });
        if (user) {
            const status = yield bcryptjs_1.compare(password, user.password);
            if (status) {
                req.session.userId = user.id;
                return res.status(200).json({
                    ok: true,
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    planType: user.planType
                });
            }
            else {
                return res.status(401).json({ message: "Invalid Credientials" });
            }
        }
        else {
            return res.status(401).json({ message: "Invalid Credientials" });
        }
    }
    catch (e) {
        console.log(chalk_1.default.red(e));
        return res.status(400).json(formatError_1.default(e));
    }
}));
userRoute.post("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(401).json(false);
        }
        res.clearCookie("qid");
        return res.json(true);
    });
});
userRoute.get("/api/isauth", isAuthenticated_1.default, (req, res) => {
    return res.status(200).json({ isLoggedIn: true });
});
exports.default = userRoute;
//# sourceMappingURL=user.js.map