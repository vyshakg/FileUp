import React from "react";
import ImageFetch from "../components/image/imageFetch";

function ImagesPage() {
  return (
    <div className="image-layout">
      <div>top</div>
      <div>
        <ImageFetch />
      </div>
    </div>
  );
}

export default ImagesPage;
