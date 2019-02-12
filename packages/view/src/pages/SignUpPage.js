import { Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/signup/SignUpForm";
function SignUpPage() {
  return (
    <div className="wrapper">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-form">
            <span className="login-form-title">Join with Smile.</span>
            <Icon type="cloud-download" className="login-base-icon" />
            <SignUpForm />
            <div className="login-signup-link-wrapper">
              <span>already have an account?</span>
              <Link to="/login"> Signin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
