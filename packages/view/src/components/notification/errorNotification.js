import { Icon, notification } from "antd";
import React from "react";

function ErrorNotification({ message, description }) {
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
