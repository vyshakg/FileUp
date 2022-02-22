import express, { Response } from "express";
import Stripe from "stripe";
import { User } from "../entity/User";
import isAuthenticated from "./middleware/isAuthenticated";

const upgradeRoute = express.Router();

upgradeRoute.post(
  "/api/upgrade",
  isAuthenticated,
  async (req, res): Promise<Response | undefined> => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET! as string);

      const { tokenId, plan } = req.body;

      const user = await User.findOne({ id: req.session!.userId });

      if (user) {
        let stripeId = user.stripeId;
        if (!stripeId) {
          const customer = await stripe.customers.create({
            email: user.email,
            source: tokenId,
            plan: process.env.PLAN
          });
          stripeId = customer.id;
        } else {
          // update customer
          await stripe.customers.update(stripeId, {
            source: tokenId
          });
          await stripe.subscriptions.create({
            customer: stripeId,
            items: [
              {
                plan: process.env.PLAN!
              }
            ]
          });
        }
        user.stripeId = stripeId;
        user.planType = plan;
        const newSub = await user.save();

        return res.status(200).json({
          planType: newSub.planType
        });
      }
    } catch (e) {
      console.log(e)
      return res.status(400).json({ ok: false });
    }
  }
);
upgradeRoute.post("/api/cancelUpgarde", isAuthenticated, async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET! as string);

    const user = await User.findOne({ id: req.session!.userId });

    if (!user || !user.stripeId || user.planType === "Free") {
      return res.status(400).json({ ok: false });
    }

    const stripeCustomer = await stripe.customers.retrieve(user.stripeId);

    const [subscription] = stripeCustomer.subscriptions.data;

    await stripe.subscriptions.del(subscription.id);

    await stripe.customers.deleteCard(user.stripeId, stripeCustomer.default_source as string);

    user.planType = "Free";
    const newSub = await user.save();

    return res.status(200).json({
      planType: newSub.planType
    });
  } catch (e) {
    return res.status(400).json({ ok: false });
  }
});

export default upgradeRoute;
