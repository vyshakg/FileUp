import { Icon, notification } from "antd";
import React from "react";

function SuccessNotification({ message, description }) {
  return notification.open({
    duration: 6,
    message,
    description,
    icon: (
      <Icon
        type="smile"
        style={{
          color: "#52c41a",
          fontSize: "2rem"
        }}
      />
    )
  });
}

export default SuccessNotification;
