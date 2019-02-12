import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";

async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const userId = req.session!.userId;
  const user = await User.findOne({ id: userId });
  if (user) {
    return next();
  }

  res.status(401).json({ message: "Session time please login" });
}
export default isAuthenticated;