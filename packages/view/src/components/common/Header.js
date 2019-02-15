import { Icon } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { AppHeader } from "../../css/common/common";
import { logout } from "../../Redux-actions/User";
import { persistor } from "../../Redux-store";
async function signout(history, logout) {
  await Promise.all([persistor.purge(), logout()]);
  history.push("/");
}
function Header({ isLoggedIn, history, logout }) {
  return (
    <AppHeader>
      <Link to="/" className="removeActiceclass">
        <div style={{ display: "inline-flex", cursor: "pointer" }}>
          <Icon type="cloud-download" style={{ fontSize: "44px", color: "white", padding: " 9px 0" }} />
          <h2 className="logo-h2-file">
            File<span className="logo-span-up">Up</span>
          </h2>
        </div>
      </Link>
      <div className="navlink-header">
        <NavLink exact to="/upload">
          <h2 className="header-navlink-h2">Upload</h2>
        </NavLink>
        <NavLink to="/images">
          <h2 className="header-navlink-h2">Images</h2>
        </NavLink>
        <NavLink to="/upgrade">
          <h2 className="header-navlink-h2">upgrade</h2>
        </NavLink>
        {isLoggedIn ? (
          // eslint-disable-next-line
          <a onClick={() => signout(history, logout)}>
            <h2 className="header-navlink-h2">signout</h2>
          </a>
        ) : (
          <NavLink to="/login">
            <h2 className="header-navlink-h2">signin</h2>
          </NavLink>
        )}
      </div>
    </AppHeader>
  );
}
function mapStateToProps(state) {
  return { isLoggedIn: !!state.User.id };
}
export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Header)
);
