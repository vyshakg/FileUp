import { Icon, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { AppHeader, SideBarProfile } from "../../css/common/common";
import { logout } from "../../Redux-actions/User";
import { persistor } from "../../Redux-store";

const { Sider } = Layout;
async function signout(history, logout) {
  await Promise.all([persistor.purge(), logout()]);
  history.push("/");
}
function Sidebar({ isLoggedIn, history, logout, location, username }) {
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
      case "/signup":
        setKey(5);
        break;
      default:
        break;
    }
  });
  return (
    <Sider
      breakpoint="xs"
      collapsedWidth="0"
      collapsible={true}
      width={160}
      style={{ zIndex: 1 }}
      collapsed={collapsed}
      onCollapse={(_, type) => {
        if (type === "clickTrigger") setCollapsed(!collapsed);
      }}
    >
      {isLoggedIn ? (
        <>
          <SideBarProfile>
            <div>
              <img
                src={`https://res.cloudinary.com/${
                  process.env.REACT_APP_CLOUD_NAME
                }/image/upload/w_150,h_150,c_thumb/FileUp/jenny`}
                alt="profilepic"
                className="profilepic sidebarprofile"
              />
            </div>

            <div className="sidebarusername">
              <h5 style={{ color: "white" }}>{username}</h5>
            </div>
          </SideBarProfile>
          <Menu theme="dark" mode="inline" selectedKeys={[`${key}`]}>
            <Menu.Item key={1} style={{ marginBottom: "2rem" }}>
              <NavLink exact to="/upload">
                <div>
                  <Icon type="upload" className="sidebarfonts" />
                  <span className="header-navlink-h2">Upload</span>
                </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={2} style={{ marginBottom: "2rem" }}>
              <NavLink to="/images">
                <div>
                  <Icon type="picture" theme="filled" className="sidebarfonts" />
                  <span className="header-navlink-h2">Images</span>
                </div>
              </NavLink>
            </Menu.Item>

            <Menu.Item key={3} style={{ marginBottom: "2rem" }}>
              <NavLink to="/upgrade">
                <div>
                  <Icon type="cloud" theme="filled" className="sidebarfonts" />
                  <span className="header-navlink-h2">Upgrade</span>
                </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={4} style={{ marginBottom: "2rem" }}>
              {/* eslint-disable-next-line */}
              <a onClick={() => signout(history, logout)}>
                <Icon type="poweroff" className="sidebarfonts" />
                <span className="header-navlink-h2">Logout</span>
              </a>
            </Menu.Item>
          </Menu>
        </>
      ) : (
        <>
          <AppHeader color={"none"} />
          <Menu theme="dark" mode="inline" selectedKeys={[`${key}`]}>
            <Menu.Item key={4} style={{ marginBottom: "2rem" }}>
              <NavLink exact to="/login">
                <div>
                  <Icon type="user" className="sidebarfonts" />
                  <span className="header-navlink-h2">login</span>
                </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={5} style={{ marginBottom: "2rem" }}>
              <NavLink exact to="/signup">
                <div>
                  <Icon type="user-add" className="sidebarfonts" />
                  <span className="header-navlink-h2">Create One</span>
                </div>
              </NavLink>
            </Menu.Item>
          </Menu>
        </>
      )}
    </Sider>
  );
}

function mapStateToProps(state) {
  return { isLoggedIn: !!state.User.id, username: state.User.username };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Sidebar)
);
