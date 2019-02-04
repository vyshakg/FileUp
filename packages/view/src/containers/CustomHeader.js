import React from "react";
import { NavLink } from "react-router-dom";
import { AppHeader } from "../layouts";
import logo from "../utils/logo.svg";
function CustomHeader() {
  return (
    <AppHeader>
      <div style={{ display: "inline-flex", cursor: "pointer" }}>
        <img alt="logo" src={logo} style={{ width: "40px" }} />
        <h2 className="logo-h2-file">
          File<span className="logo-span-up">Up</span>
        </h2>
      </div>
      <div className="navlink-header">
        <NavLink
          to="/allfiles"
          activeClassName="active-header-navlink"
          className="header-navlink"
        >
          <h2 className="header-navlink-h2">All files</h2>
        </NavLink>
        <NavLink
          to="/yourfiles"
          activeClassName="active-header-navlink"
          className="header-navlink"
        >
          <h2 className="header-navlink-h2">Your files</h2>
        </NavLink>
        <NavLink
          to="/analyze"
          activeClassName="active-header-navlink"
          className="header-navlink"
        >
          <h2 className="header-navlink-h2">Analyze</h2>
        </NavLink>
      </div>
    </AppHeader>
  );
}

export default CustomHeader;
