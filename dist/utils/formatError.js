"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (e) => {
    const result = [];
    Object.values(e.details).map(err => {
        const obj = lodash_1.default.pick(err, ["path", "message"]);
        result.push({
            path: obj.path[0],
            message: obj.message
        });
    });
    return result;
};
//# sourceMappingURL=formatError.js.map