"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.session.userId;
        const user = yield User_1.User.findOne({ id: userId });
        if (user) {
            return next();
        }
        else {
            return res.status(401).json({ isLoggedIn: false, description: "Session timed Out! please login" });
        }
    });
}
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map