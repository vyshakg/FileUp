import { Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
function LoginPage() {
  return (
    <div className="wrapper">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-form">
            <span className="login-form-title">Welcome Back.</span>
            <Icon type="cloud-download" className="login-base-icon" />
            <LoginForm />
            <div className="login-signup-link-wrapper">
              <span>Don't have an account?</span>
              <Link to="/signup"> Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
