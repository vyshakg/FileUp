import Axios from "axios";
import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { UpgradeButton } from "../../css/upgrade/upgrade";
import ErrorNotification from "../notification/ErrorNotification";
import SuccessNotification from "../notification/SuccessNotification";

async function upgradeServer(tokenId) {
  try {
    const response = await Axios.post("/api/upgrade", { tokenId: tokenId });
    if (response) {
      SuccessNotification({ message: "Successfuly upgraded your account" });
    }
  } catch (err) {
    ErrorNotification({ message: "Payment didn't go through" });
  }
}

function UpgardeHandle({ amount, color, hoverColor, email }) {
  return (
    <StripeCheckout
      token={token => upgradeServer(token.id)}
      stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
      name="File Up."
      description="The better Cloud."
      amount={amount}
      currency="INR"
      email={email}
      image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/w_100,h_100/FileUp/cloud`}
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
export default connect(mapStateToPrps)(UpgardeHandle);
