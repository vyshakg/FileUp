import { Icon, notification } from "antd";
import React from "react";

function ErrorNotification({ message = "Upload Unsuccessfull", description = "Server Error! try after sometime" }) {
  return notification.open({
    message,
    description,
    icon: (
      <Icon
        type="frown"
        style={{
          color: "#f5232e",
          fontSize: "2rem"
        }}
      />
    )
  });
}

export default ErrorNotification;
