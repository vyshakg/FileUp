import { Col, Row } from "antd";
import React from "react";
import ImageFetch from "../components/image/ImageFetch";
import ImageHeader from "../components/image/ImageHeader";

function ImagesPage() {
  return (
    <Row>
      <Col xs={2} sm={2} md={2} lg={2} xl={4} xxl={5} />
      <Col xs={20} sm={20} md={20} lg={20} xl={16} xxl={14}>
        <ImageHeader />
        <ImageFetch />
      </Col>
      <Col xs={2} sm={2} md={2} lg={2} xl={4} xxl={5} />
    </Row>
  );
}

export default ImagesPage;
