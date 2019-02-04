import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;
function CustomFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Made with
      <span role="img" aria-label="heart" className="custom-emoji">
        ❤️
      </span>
      by vyshak.G
    </Footer>
  );
}

export default CustomFooter;
