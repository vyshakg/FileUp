import { compare, hash } from "bcryptjs";
import chalk from "chalk";
import express from "express";
import { User } from "../entity/User";

const userRoute = express.Router();

userRoute.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // TODO : validation
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "Email already exists" });
    }

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
  } catch (e) {
    console.log(chalk.red(e));
    return res.status(401).json({ message: "Something went Wrong" });
  }
});

userRoute.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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
    return res.status(401).json({ message: "Something went Wrong" });
  }
});

export default userRoute;
