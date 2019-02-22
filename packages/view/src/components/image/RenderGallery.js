/* eslint jsx-a11y/anchor-is-valid: 0 */ // --> OFF
import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePhoto, favouritePhotoAction } from "../../Redux-actions/Images";
import SuccessNotification from "../notification/SuccessNotification";
const confirm = Modal.confirm;

function onClickFavourite(e, id, favouritePhotoAction) {
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  favouritePhotoAction({ id });
}

function onClickDelete(e, id, deletePhoto) {
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();

  confirm({
    title: "Do you Want to delete this image?",
    centered: true,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deletePhoto({ id }).then(() => {
        SuccessNotification({ message: "Image deleted Successfully" });
      });
    },
    onCancel() {
      return;
    }
  });
}
function RenderGallery({ images, openLightbox, deletePhoto, favouritePhotoAction }) {
  if (!images) return;

  if (images.length === 0) {
    return (
      <div className="wrapper-withNoimages">
        <div className="withNoimages">
          <h1 style={{ color: "#447efd" }}>No images Uploaded</h1>
          <h4 className="Custom-style-no-upload">
            <Link exact to="/upload">
              upload
            </Link>{" "}
            new images
          </h4>
        </div>
      </div>
    );
  }
  const gallery = images.map((obj, i) => {
    return (
      <div className="hovereffect" key={i}>
        <img src={obj.thumbnail} alt={obj.caption} />
        <div className="overlay" onClick={e => openLightbox(i, e)}>
          <h2>{obj.caption}</h2>

          <p style={{ marginTop: "150px" }}>
            <a className="info" onClick={e => onClickDelete(e, obj.id, deletePhoto)} style={{ marginRight: "40px" }}>
              <span className="fa fa-trash" />
            </a>

            <a
              className="info"
              style={obj.favouritePhoto ? yellowColor : whiteColor}
              onClick={e => onClickFavourite(e, obj.id, favouritePhotoAction)}
            >
              <span className="fa fa-star" />
            </a>
          </p>
        </div>
      </div>
    );
  });

  return <div className="images-wrapper">{gallery}</div>;
}
const yellowColor = {
  color: "yellow"
};
const whiteColor = {
  color: "white"
};
export default connect(
  null,
  { deletePhoto, favouritePhotoAction }
)(RenderGallery);
