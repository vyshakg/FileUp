import React from "react";
import { NavLink } from "react-router-dom";
import { AppHeader } from "../css/Applayout/MainContainer";
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
        <NavLink exact to="/" className="header-navlink">
          <h2 className="header-navlink-h2">Upload</h2>
        </NavLink>
        <NavLink to="/yourfiles">
          <h2 className="header-navlink-h2">Images</h2>
        </NavLink>
      </div>
    </AppHeader>
  );
}

export default CustomHeader;
