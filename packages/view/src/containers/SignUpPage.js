import { Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
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
              <span className="">already have an account?</span>
              <Link className="txt2" to="/login">
                {" "}
                Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
