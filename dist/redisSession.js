"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = process.env.NODE_ENV === "production" ? new ioredis_1.default(process.env.REDIS_URL) : new ioredis_1.default();
exports.default = () => {
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const devConfig = {
        host: process.env.REDIS_HOST,
        port: 6379,
        client: exports.redis
    };
    const proConfig = {
        client: exports.redis
    };
    const storeConfig = process.env.NODE_ENV === "production" ? proConfig : devConfig;
    const store = new RedisStore(storeConfig);
    return express_session_1.default({
        store,
        name: "qid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    });
};
//# sourceMappingURL=redisSession.js.map