import { Form, Icon, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { register } from "../../Redux-actions/User";
export class SignUpForm extends Component {
  state = {
    data: {
      username: "",
      email: "",
      password: ""
    }
  };
 
  handleChange = ({ target }) => {
    this.setState({ data: { ...this.state.data, [target.name]: target.value } });
  };
  onSubmit = () => {
    this.props
      .register(this.state.data)
      .then(() => this.props.history.push("/upload"))
      // .catch(err => {
      //   this.setState({ errors: err.response.data });
      // });
  };
  render() {
    const { data } = this.state;
    
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
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            name="username"
            placeholder="Username"
            value={data.username}
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
                Create
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
    { register }
  )(SignUpForm)
);
