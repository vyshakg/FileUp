import React, { useState } from "react";
import Lightbox from "react-images";
import RenderGallery from "./RenderGallery";

function ImageHandle({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

  const openLightbox = (index, event) => {
    event.preventDefault();

    setCurrentImage(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };
  const gotoNext = () => {
    setCurrentImage(currentImage + 1);
  };

  const handleClickImage = images => {
    if (currentImage === images.length - 1) return;

    gotoNext();
  };

  return (
    <>
      <RenderGallery images={images} openLightbox={openLightbox} />
      <Lightbox
        images={images}
        currentImage={currentImage}
        isOpen={lightboxIsOpen}
        onClickPrev={() => setCurrentImage(currentImage - 1)}
        onClickNext={gotoNext}
        onClose={closeLightbox}
        onClickThumbnail={index => setCurrentImage(index)}
        onClickImage={() => handleClickImage(images)}
        showThumbnails={true}
        backdropClosesModal={true}
      />
    </>
  );
}

export default ImageHandle;
