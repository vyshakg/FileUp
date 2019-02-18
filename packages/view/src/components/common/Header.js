import { Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "../../css/common/common";

function Header() {
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
    </AppHeader>
  );
}
export default Header;
