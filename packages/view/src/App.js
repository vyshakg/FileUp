import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomFooter from "./components/common/Footer";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import { ImagesPage, LoginPage, SignUpPage, UploadPage } from "./pages";
const { Content } = Layout;
// hwey i ak here in stripe
function App() {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content className="Content-height">
          <Switch>
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/images" component={ImagesPage} />
          </Switch>
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
}

export default App;
