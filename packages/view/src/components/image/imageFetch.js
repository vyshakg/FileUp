import Axios from "axios";
import React, { Component } from "react";
import ImageHandle from "./ImageHandle";
class ImageFetch extends Component {
  state = {
    images: []
  };
  makeImageSrc = photoId => {
    return `https://res.cloudinary.com/imagecloudinaryapi/image/upload/${photoId}`;
  };
  makeImageThumbnail = photoId => {
    const wSize = 300;
    const hSize = 300;
    return `https://res.cloudinary.com/imagecloudinaryapi/image/upload/w_${wSize},h_${hSize},c_thumb/${photoId}`;
  };
  componentDidMount() {
    Axios.get("/api/allpics").then(res => {
      this.setState({ images: res.data });
    });
  }
  render() {
    const { images } = this.state;
    return (
      <ImageHandle
        images={images.map(({ photoId, originalFilename }) => ({
          src: this.makeImageSrc(photoId),
          thumbnail: this.makeImageThumbnail(photoId),
          caption: originalFilename
        }))}
      />
    );
  }
}

export default ImageFetch;
