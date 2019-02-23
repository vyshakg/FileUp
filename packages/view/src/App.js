import { Layout } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import CustomFooter from "./components/common/Footer";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import { ImagesPage, LoginPage, SignUpPage, UploadPage } from "./pages";
import LandingPage from "./pages/LandingPage";
import UpgradePage from "./pages/UpgradePage";
const { Content } = Layout;

function App({ isLoggedIn, location }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content>
          <Switch>
            <Route exact location={location} path="/" component={LandingPage} />
            <Route exact location={location} path="/login" component={LoginPage} />
            <Route exact location={location} path="/signup" component={SignUpPage} />

            {isLoggedIn ? (
              <>
                <Route location={location} exact path="/upload" component={UploadPage} />
                <Route location={location} exact path="/images" component={ImagesPage} />
                <Route location={location} exact path="/upgrade" component={UpgradePage} />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
}
function mapStateToProps(state) {
  return { isLoggedIn: !!state.User.id };
}
export default connect(mapStateToProps)(App);
