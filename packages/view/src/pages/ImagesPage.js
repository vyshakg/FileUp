import React from "react";

class ImagesPage extends React.Component {
  state = {
    images: []
  };

  // componentDidMount() {
  //   Axios.get("/api/allpics").then(res => {
  //     const allpics = res.data;
  //     const images = [];
  //     allpics.map(img => {
  //       images.push({
  //         src: `https://res.cloudinary.com/imagecloudinaryapi/image/upload/${img.photoId}`,
  //         width: 4,
  //         height: 3
  //       });
  //       return null;
  //     });
  //     console.log(images);
  //     this.setState({ images });
  //   });
  // }
  render() {
    return <div>hey</div>;
  }
}

export default ImagesPage;
