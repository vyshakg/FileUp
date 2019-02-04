import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CustomFooter, CustomHeader, UploadPage } from "./containers";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <CustomHeader />
      <Content>
        <Switch>
          <Route exact path="/" component={UploadPage} />
        </Switch>
      </Content>
      <CustomFooter />
    </Layout>
  );
}

export default App;
