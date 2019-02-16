import React, { useEffect } from "react";
import { connect } from "react-redux";
import { load } from "../../Redux-actions/Images";
import ImageHandle from "./ImageHandle";

function makeImageThumbnail(photoId) {
  const wSize = 300;
  const hSize = 300;
  return `https://res.cloudinary.com/imagecloudinaryapi/image/upload/w_${wSize},h_${hSize},c_thumb/${photoId}`;
}
function makeImageSrc(photoId) {
  return `https://res.cloudinary.com/imagecloudinaryapi/image/upload/${photoId}`;
}
const ImageFetch = ({ load, images }) => {
  useEffect(() => {
    load();
  }, []);

  return (
    <ImageHandle
      images={images.map(({ photoId, originalFilename,id }) => ({
        id,
        src: makeImageSrc(photoId),
        thumbnail: makeImageThumbnail(photoId),
        caption: originalFilename
      }))}
    />
  );
};
function mapStatetoProps(state) {
  return { images: state.Images };
}
export default connect(
  mapStatetoProps,
  { load }
)(ImageFetch);
