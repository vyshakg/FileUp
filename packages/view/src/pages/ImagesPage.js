import Axios from "axios";
import React from "react";
import Lightbox from "react-images";

class ImagesPage extends React.Component {
  state = {
    images: [],
    currentImage: 0,
    lightboxIsOpen: false
  };
  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  renderGallery = () => {
    const { images } = this.state;

    if (!images) return;

    const gallery = images.map((obj, i) => {
      return <img src={obj.src} key={i} onClick={e => this.openLightbox(i, e)} alt={i} className="imgCustom" />;
    });

    return <div className="images-wrapper">{gallery}</div>;
  };
  handleClickImage = () => {
    if (this.state.currentImage === this.state.images.length - 1) return;

    this.gotoNext();
  };
  gotoImage = index => {
    this.setState({
      currentImage: index
    });
  };
  componentDidMount() {
    Axios.get("/api/allpics").then(res => {
      const allpics = res.data;
      const images = [];
      allpics.map(img => {
        images.push({
          src: `https://res.cloudinary.com/imagecloudinaryapi/image/upload/${img.photoId}`,
          caption: img.originalFilename
        });
        return null;
      });
      console.log(images);
      this.setState({ images });
    });
  }
  render() {
    return (
      <>
        {this.renderGallery()}
        <Lightbox
          images={this.state.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickThumbnail={this.gotoImage}
          showThumbnails={true}
          // theme={theme}
        />
      </>
    );
  }
}

export default ImagesPage;
