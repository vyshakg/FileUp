"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const User_1 = require("../entity/User");
const isAuthenticated_1 = __importDefault(require("./middleware/isAuthenticated"));
const upgradeRoute = express_1.default.Router();
upgradeRoute.post("/api/upgrade", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET);
        const { tokenId, plan } = req.body;
        const user = yield User_1.User.findOne({ id: req.session.userId });
        if (user) {
            let stripeId = user.stripeId;
            if (!stripeId) {
                const customer = yield stripe.customers.create({
                    email: user.email,
                    source: tokenId,
                    plan: process.env.PLAN
                });
                stripeId = customer.id;
            }
            else {
                yield stripe.customers.update(stripeId, {
                    source: tokenId
                });
                yield stripe.subscriptions.create({
                    customer: stripeId,
                    items: [
                        {
                            plan: process.env.PLAN
                        }
                    ]
                });
            }
            user.stripeId = stripeId;
            user.planType = plan;
            const newSub = yield user.save();
            return res.status(200).json({
                planType: newSub.planType
            });
        }
    }
    catch (e) {
        return res.status(400).json({ ok: false });
    }
}));
upgradeRoute.post("/api/cancelUpgarde", isAuthenticated_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET);
        const user = yield User_1.User.findOne({ id: req.session.userId });
        if (!user || !user.stripeId || user.planType === "Free") {
            return res.status(400).json({ ok: false });
        }
        const stripeCustomer = yield stripe.customers.retrieve(user.stripeId);
        const [subscription] = stripeCustomer.subscriptions.data;
        yield stripe.subscriptions.del(subscription.id);
        yield stripe.customers.deleteCard(user.stripeId, stripeCustomer.default_source);
        user.planType = "Free";
        const newSub = yield user.save();
        return res.status(200).json({
            planType: newSub.planType
        });
    }
    catch (e) {
        return res.status(400).json({ ok: false });
    }
}));
exports.default = upgradeRoute;
//# sourceMappingURL=upgrade.js.map