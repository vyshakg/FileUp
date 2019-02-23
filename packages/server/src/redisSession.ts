import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";

export const redis = new Redis();
export default () => {
  const RedisStore = connectRedis(session);

  const store = new RedisStore({
    host: process.env.REDIS_HOST,
    port: 6379,
    client: redis as any
  });

  return session({
    store,
    name: "qid",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  });
};
