import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";

export const redis = new Redis();

export default () => {
  const RedisStore = connectRedis(session);

  const devConfig = {
    // host: process.env.REDIS_HOST,
    // port: 6379,
    client: redis as any
  };

  // const proConfig = {
  //   client: redis as any
  // };
  // const storeConfig = process.env.NODE_ENV === "production" ? proConfig : devConfig;

  const store = new RedisStore(devConfig);
  store.all((e,ob)=>{
    console.log(ob)
  })
  return session({
    store,
    name: "qid",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  });
};
