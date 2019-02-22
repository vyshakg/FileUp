import express, { Response } from "express";
import Stripe from "stripe";
import { User } from "../entity/User";
// import { stripe } from "../utils/stripe";
import isAuthenticated from "./middleware/isAuthenticated";
const upgradeRoute = express.Router();

upgradeRoute.post(
  "/api/upgrade",
  isAuthenticated,
  async (req, res): Promise<Response | undefined> => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET! as string);

      const { tokenId } = req.body;
      const user = await User.findOne({ id: req.session!.userId });

      if (user) {
        const customer = await stripe.customers.create({
          email: user.email,
          source: tokenId,
          plan: process.env.PLAN
        });

        user.stripeId = customer.id;
        user.planType = "Pro";
        await user.save();

        return res.status(200).json({ ok: true });
      }
    } catch (e) {
      return res.status(400).json({ ok: false });
    }
  }
);

export default upgradeRoute;
