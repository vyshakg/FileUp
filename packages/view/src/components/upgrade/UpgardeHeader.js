import { Alert, Button, Divider, Modal, Tag } from "antd";
import React from "react";
import { connect } from "react-redux";
import { unSubscribe } from "../../Redux-actions/User";
import ErrorNotification from "../notification/ErrorNotification";
import SuccessNotification from "../notification/SuccessNotification";
const confirm = Modal.confirm;
function showUnsubscribedConfirm(unSubscribe) {
  confirm({
    title: "Are you sure you want to unsubscribe?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    maskClosable: true,
    onOk() {
      unSubscribe()
        .then(() => {
          SuccessNotification({
            message: "Successfully Unsubscribed",
            description: "you are in Free Version! Happy Uploading"
          });
        })
        .catch(() => {
          ErrorNotification({
            message: "Unsubscribed failed",
            description: "cannot unsubscribed right now! try after somtime"
          });
        });
    }
  });
}

function UpgardeHeader({ planType, unSubscribe }) {
  return (
    <div className="upgarder-header">
      <div>
        <Alert
          message="You are already upgarded your account"
          description={
            <>
              <span>
                you are using <Tag color="#108ee9">{planType}</Tag>pack
              </span>
              <Divider />
              <h4>Cancel your subscribtions</h4>
              <Button type="danger" block onClick={() => showUnsubscribedConfirm(unSubscribe)}>
                Unsubscribe
              </Button>
            </>
          }
          type="info"
        />
      </div>
      <div />
      <div />
    </div>
  );
}
function mapsStateToProps(state) {
  return { planType: state.User.planType };
}
export default connect(
  mapsStateToProps,
  { unSubscribe }
)(UpgardeHeader);
