import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomFooter from "./components/common/Footer";
import Header from "./components/common/Header";
import { LoginPage, SignUpPage, UploadPage } from "./pages";
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
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
