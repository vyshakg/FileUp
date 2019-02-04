import React from "react";
import UploadHandle from "../components/upload/UploadHandle";
import { MainContainer, UploadWrapper, Header } from "../layouts";
import { Icon } from "antd";

function uploadPage() {
  return (
    <MainContainer>
      <UploadWrapper>
        <div className="header-style">
          <i className="fa fa-circle coustom-circle-red" />
          <i className="fa fa-circle coustom-circle-green" />
          <i className="fa fa-circle coustom-circle-grey" />
        </div>

        <Header>Submit Your Code</Header>
        <p className="sub-head-style">
          Let it analyzed by thousands of People <Icon type="smile" />
        </p>
        <Icon type="code" theme="twoTone" className="custom-icon-style" />
        <Icon
          type="snippets"
          theme="twoTone"
          twoToneColor="#52c41a"
          className="custom-icon-style"
        />
        <Icon
          type="file-text"
          theme="twoTone"
          twoToneColor="#eb2f96"
          className="custom-icon-style"
        />

        <div className="uploadHandle-wrapper">
          <UploadHandle />
        </div>
      </UploadWrapper>
    </MainContainer>
  );
}

export default uploadPage;
