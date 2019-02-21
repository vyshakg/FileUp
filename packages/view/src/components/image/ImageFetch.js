/* eslint-disable no-extend-native */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load } from "../../Redux-actions/Images";
import limit from "../../utils/limitFunction";
import skip from "../../utils/skipFunction";
import CustomPagination from "./CustomPagination";
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
  const [page, setPage] = useState(0);
  // const [pageSize,setPageSize] = useState(9);

  Array.prototype.limit = limit;
  Array.prototype.skip = skip;
  useEffect(() => {
    load();
  }, []);
  const length = images.length;
  const onPageChange = (pageCount, pageSize) => {
    // console.log("TCL: CustomPagination -> pageSize", pageSize);
    console.log("TCL: CustomPagination -> page", page);
    setPage((pageCount - 1) * pageSize);
  };
  return (
    <>
      <ImageHandle
        images={images
          .skip(page)
          .limit(9)
          .map(({ photoId, originalFilename, id, favouritePhoto }) => ({
            id,
            favouritePhoto,
            src: makeImageSrc(photoId),
            thumbnail: makeImageThumbnail(photoId),
            caption: originalFilename
          }))}
      />
      <CustomPagination onPageChange={onPageChange} length={length} />
    </>
  );
};
function mapStatetoProps(state) {
  return { images: state.Images };
}
export default connect(
  mapStatetoProps,
  { load }
)(ImageFetch);
