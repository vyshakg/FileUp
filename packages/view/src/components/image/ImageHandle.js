import React, { Component } from "react";
import Lightbox from "react-images";

class ImageHandle extends Component {
  state = {
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

  gotoImage = index => {
    this.setState({
      currentImage: index
    });
  };
  handleClickImage = () => {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  };

  renderGallery = () => {
    const { images } = this.props;

    if (!images) return;

    const gallery = images.map((obj, i) => {
      return (
        <div className="hovereffect" key={i} onClick={e => this.openLightbox(i, e)}>
          <img src={obj.thumbnail} alt={obj.caption} />
          <div className="overlay">
            <h2>{obj.caption}</h2>
            {/* <a class="info" href="/">
              link here
            </a> */}
          </div>
        </div>
      );
    });

    return <div className="images-wrapper">{gallery}</div>;
  };
  render() {
    return (
      <>
        {this.renderGallery()}
        <Lightbox
          images={this.props.images}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          onClickThumbnail={this.gotoImage}
          onClickImage={this.handleClickImage}
          showThumbnails={true}
          backdropClosesModal={true}
        />
      </>
    );
  }
}

export default ImageHandle;
