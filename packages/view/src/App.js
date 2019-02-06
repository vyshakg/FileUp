import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CustomFooter, CustomHeader, LoginPage, UploadPage } from "./containers";
import SignUpPage from "./containers/SignUpPage";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <CustomHeader />
      <Content>
        <Switch>
          <Route exact path="/upload" component={UploadPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </Switch>
      </Content>
      <CustomFooter />
    </Layout>
  );
}

export default App;
