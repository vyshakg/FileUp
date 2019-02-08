import { compare, hash } from "bcryptjs";
import chalk from "chalk";
import express from "express";
import Joi from "joi";
import { User } from "../entity/User";
import formatError from "../utils/formatError";
import { signIn, signUp } from "../validation";
const userRoute = express.Router();

userRoute.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await Joi.validate({ username, email, password }, signUp, { abortEarly: false });

    const user = await User.findOne({ email });
    if (!user) {
      const hashPassword: string = await hash(password, 10);

      let newUser = User.create({
        username,
        email,
        password: hashPassword
      });
      newUser = await newUser.save();

      return res.status(200).json({
        ok: true,
        username: newUser.username,
        email: newUser.email
      });
    } else {
      return res.status(401).json({ path: "email", message: "Email already exists" });
    }
  } catch (e) {
    // console.log(chalk.red(e));
    return res.status(401).json(formatError(e));
  }
});

userRoute.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await Joi.validate({ email, password }, signIn, { abortEarly: false });
    const user = await User.findOne({ email });
    if (user) {
      const status: boolean = await compare(password, user.password);
      if (status) {
        req.session!.userId = user.id;
        return res.status(200).json({
          ok: true,
          email: user.email,
          username: user.username
        });
      }
    }
    return res.status(401).json({ message: "Invalid Credientials" });
  } catch (e) {
    console.log(chalk.red(e));
    return res.status(401).json(formatError(e));
  }
});

export default userRoute;
