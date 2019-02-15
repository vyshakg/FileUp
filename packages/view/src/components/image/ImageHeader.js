import React from "react";
import { connect } from "react-redux";
import formatFileSize from "../../utils/formatFileSize";
function totalBytesUsed(images) {
  let totalSize = 0;
  images.forEach(element => {
    totalSize += element.size;
  });
  totalSize = formatFileSize(totalSize);

  return totalSize;
}
function noOfFavouritePhoto(images) {
  let count = 0;
  images.forEach(element => {
    if (element.avouritePhoto) count += 1;
  });
  return count;
}
function ImageHeader({ user, noOfImages, images }) {
  return (
    <>
      <div className="imageHolder">
        <img
          src="https://res.cloudinary.com/imagecloudinaryapi/image/upload/w_150,h_150,c_thumb/FileUp/jenny"
          alt="profilepic"
          className="profilepic"
        />
      </div>
      <section className="image-dashbord-wrapper">
        <h1 style={{ fontSize: "2.5rem" }}>{user.username}</h1>
        <div className="images-dashboard ">
          <div className="dashboard-card backgroundCrimson">
            <h4 className="colourWhite" style={{ margin: "4px 0 0 0" }}>
              {noOfImages}
            </h4>
            <h5 className="colourWhite">Images</h5>
          </div>
          <div style={{ background: "cornflowerblue" }} className="dashboard-card">
            <h4 className="colourWhite" style={{ margin: "4px 0 0 0" }}>
              {totalBytesUsed(images)}
            </h4>{" "}
            <h5 className="colourWhite">space used</h5>
          </div>
          <div style={{ background: "gray" }} className="dashboard-card">
            <h4 className="colourWhite" style={{ margin: "4px 0 0 0" }}>
              {noOfFavouritePhoto(images)}
            </h4>
            <h5 className="colourWhite">favourite</h5>
          </div>
        </div>
      </section>
    </>
  );
}
function mapStateToProps(state) {
  return { user: state.User, noOfImages: state.Images.length, images: state.Images };
}

export default connect(mapStateToProps)(ImageHeader);
