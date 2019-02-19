import Axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
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

function UpgardeHandle() {
  return (
    <div style={{ marginLeft: "12rem" }}>
      <StripeCheckout token={token => upgradeServer(token.id)} stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY} />
    </div>
  );
}

export default UpgardeHandle;
