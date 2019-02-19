import express, { Response } from "express";
import { User } from "../entity/User";
import isAuthenticated from "./middleware/isAuthenticated";

const upgradeRoute = express.Router();

upgradeRoute.post(
  "/api/upgrade",
  isAuthenticated,
  async (req, res): Promise<Response> => {
    try {
      const { tokenId } = req.body;
      const user = await User.findOne({ id: req.session!.userId });
      if (user) {
        user.stripeId = tokenId;
        user.type = "upgraded-tier";
        user.save();
        return res.status(200).json({ ok: true });
      } else {
        return res.status(400).json({ ok: false });
      }
    } catch (e) {
      return res.status(400).json({ ok: false });
    }
  }
);

export default upgradeRoute;
