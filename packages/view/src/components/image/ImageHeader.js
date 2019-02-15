import React from "react";

function ImageHeader() {
  return (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/imagecloudinaryapi/image/upload/w_150,h_150,c_thumb/FileUp/jenny"
          alt="profilepic"
          className="profilepic"
        />
      </div>
      <section>
        <div>name</div>
        <div>staticts</div>
      </section>
    </>
  );
}

export default ImageHeader;
