import React from "react";
import ImageFetch from "../components/image/imageFetch";
import ImageHeader from "../components/image/ImageHeader";

function ImagesPage() {
  return (
    <div className="image-layout">
      <div className="imageheader">
        <ImageHeader />
      </div>
      <div>
        <ImageFetch />
      </div>
    </div>
  );
}

export default ImagesPage;
