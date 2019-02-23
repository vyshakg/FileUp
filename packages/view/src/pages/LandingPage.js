import React from "react";
import { Link } from "react-router-dom";
import { LandingContainer } from "../css/common/landing";
import logo from "../images/cloud-logo1.png";

function LandingPage() {
  return (
    <LandingContainer>
      <h1 className="landing-title">Upload to cloud with FileUp.</h1>
      <img src={logo} alt="logo" className="img-landing" />
      <Link className="landingpage-buttons" to="/login">
        Get started for Free
      </Link>
    </LandingContainer>
  );
}

export default LandingPage;
