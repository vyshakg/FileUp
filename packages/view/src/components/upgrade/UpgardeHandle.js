import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { UpgradeButton } from "../../css/upgrade/upgrade";
import logo from "../../images/cloud-logo1.png";
import { subscribe } from "../../Redux-actions/User";
import ErrorNotification from "../notification/ErrorNotification";
import SuccessNotification from "../notification/SuccessNotification";

function upgradeServer(token, amount, subscribe) {
  let plan = null;
  if (amount === 50000) plan = "Pro";
  if (amount === 150000) plan = "Premium";

  const data = { tokenId: token.id, plan };
  subscribe(data)
    .then(() => {
      SuccessNotification({ message: "Successfuly upgraded your account" });
    })
    .catch(() => {
      ErrorNotification({ message: "Payment didn't go through" });
    });
}

function UpgardeHandle({ amount, color, hoverColor, email, subscribe }) {
  return (
    <StripeCheckout
      token={token => upgradeServer(token, amount, subscribe)}
      stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
      name="File Up."
      description="The better Cloud."
      amount={amount}
      currency="INR"
      email={email}
      image={logo}
    >
      <UpgradeButton color={color} hoverColor={hoverColor}>
        Upgrade
      </UpgradeButton>
    </StripeCheckout>
  );
}
function mapStateToPrps(state) {
  return { email: state.User.email };
}
export default connect(
  mapStateToPrps,
  { subscribe }
)(UpgardeHandle);
