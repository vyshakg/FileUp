import { Icon, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { AppHeader } from "../../css/common/common";
import { logout } from "../../Redux-actions/User";
import { persistor } from "../../Redux-store";

const { Sider } = Layout;
async function signout(history, logout) {
  await Promise.all([persistor.purge(), logout()]);
  history.push("/");
}

function Sidebar({ isLoggedIn, history, logout, location }) {
  const [collapsed, setCollapsed] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/upload":
        setKey(1);
        break;
      case "/images":
        setKey(2);
        break;
      case "/upgrade":
        setKey(3);
        break;
      case "/login":
        setKey(4);
        break;
      default:
        break;
    }
  });

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      collapsible={true}
      width={180}
      collapsed={collapsed}
      onCollapse={(_, type) => {
        if (type === "clickTrigger") setCollapsed(!collapsed);
      }}
    >
      <AppHeader color={"none"} />

      <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${key}`]}>
        <Menu.Item key={1}>
          <NavLink exact to="/upload">
            <div>
              <Icon type="upload" className="sidebarfonts" />
              <span className="header-navlink-h2">Upload</span>
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item key={2}>
          <NavLink to="/images">
            <div>
              <Icon type="picture" theme="filled" className="sidebarfonts" />
              <span className="header-navlink-h2">Images</span>
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item key={3}>
          <NavLink to="/upgrade">
            <div>
              <Icon type="cloud" theme="filled" className="sidebarfonts" />
              <span className="header-navlink-h2">Upgrade</span>
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item key={4}>
          {isLoggedIn ? (
            // eslint-disable-next-line
            <a onClick={() => signout(history, logout)}>
              <Icon type="poweroff" className="sidebarfonts" />
              <span className="header-navlink-h2">Logout</span>
            </a>
          ) : (
            <NavLink to="/login">
              <Icon type="user" className="sidebarfonts" />
              <span className="header-navlink-h2">Sign In</span>
            </NavLink>
          )}
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

function mapStateToProps(state) {
  return { isLoggedIn: !!state.User.id };
}
export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Sidebar)
);
