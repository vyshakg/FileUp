"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string()
    .email()
    .required()
    .label("Email");
const username = joi_1.default.string()
    .min(3)
    .max(30)
    .required()
    .label("Username");
const password = joi_1.default.string()
    .min(4)
    .max(15)
    .required()
    .label("Password");
exports.signUp = joi_1.default.object().keys({
    email,
    username,
    password
});
exports.signIn = joi_1.default.object().keys({
    email,
    password
});
//# sourceMappingURL=userValidation.js.map