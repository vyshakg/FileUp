import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomFooter from "./components/common/Footer";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import { ImagesPage, LoginPage, SignUpPage, UploadPage } from "./pages";
import UpgradePage from "./pages/UpgradePage";
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/images" component={ImagesPage} />
            <Route exact path="/upgrade" component={UpgradePage} />
          </Switch>
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
}

export default App;
