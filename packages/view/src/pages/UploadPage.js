import { Icon } from "antd";
import React from "react";
import ServerUploadHandle from "../components/upload/UploadHandle";
import { MainContainer } from "../css/common/common";
import { Header, UploadWrapper } from "../css/upload/Upload";

function uploadPage() {
  return (
    <MainContainer>
      <UploadWrapper>
        <div className="header-style">
          <i className="fa fa-circle coustom-circle-red" />
          <i className="fa fa-circle coustom-circle-green" />
          <i className="fa fa-circle coustom-circle-grey" />
        </div>

        <Header>Save On Cloud</Header>
        <p className="sub-head-style">
          Upload your images with smile <Icon type="smile" />
        </p>

        <Icon type="picture" theme="twoTone" twoToneColor="#52c41a" className="custom-icon-style" />
        <Icon type="camera" theme="twoTone" twoToneColor="#eb2f96" className="custom-icon-style" />

        <div className="uploadHandle-wrapper">
          <ServerUploadHandle />
        </div>
      </UploadWrapper>
    </MainContainer>
  );
}

export default uploadPage;
