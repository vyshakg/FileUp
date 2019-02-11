import { Icon } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { AppHeader } from "../../css/common/common";
function Header() {
  return (
    <AppHeader>
      <div style={{ display: "inline-flex", cursor: "pointer" }}>
        <Icon type="cloud-download" style={{ fontSize: "44px", color: "white", padding: " 9px 0" }} />
        <h2 className="logo-h2-file">
          File<span className="logo-span-up">Up</span>
        </h2>
      </div>
      <div className="navlink-header">
        <NavLink exact to="/upload">
          <h2 className="header-navlink-h2">Upload</h2>
        </NavLink>
        <NavLink to="/yourfiles">
          <h2 className="header-navlink-h2">Images</h2>
        </NavLink>
        <NavLink to="/upgrade">
          <h2 className="header-navlink-h2">upgrade</h2>
        </NavLink>
      </div>
    </AppHeader>
  );
}

export default Header;
