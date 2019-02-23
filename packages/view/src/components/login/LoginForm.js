import { Alert, Form, Icon, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../../Redux-actions/User";
export class LoginForm extends Component {
  state = {
    data: {
      email: "guest@guest.com",
      password: "guest"
    },
    errors: []
  };
  onClose = () => {
    this.setState({ errors: [] });
  };
  handleChange = ({ target }) => {
    this.setState({ data: { ...this.state.data, [target.name]: target.value }, errors: [] });
  };
  onSubmit = () => {
    this.props
      .login(this.state.data)
      .then(() => {
        this.props.history.push("/upload");
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
  };
  render() {
    const { data, errors } = this.state;
    if (!(Object.keys(errors).length === 0)) {
      return (
        <Alert
          message="Input Error"
          description={errors.map((err, i) => (
            <li key={i}>{err.message}</li>
          ))}
          type="error"
          closable
          onClose={this.onClose}
          showIcon
        />
      );
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn" />
              <button className="login100-form-btn" onClick={this.onSubmit}>
                Login
              </button>
            </div>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(
  connect(
    null,
    { login }
  )(LoginForm)
);
