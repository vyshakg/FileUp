import React from "react";
import { connect } from "react-redux";
import { deletePhoto } from "../../Redux-actions/Images";
async function onClickDelete(e, id, deletePhoto) {
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  console.log(id);
  await deletePhoto({ id });
}
function RenderGallery({ images, openLightbox, deletePhoto }) {
  if (!images) return;

  const gallery = images.map((obj, i) => {
    return (
      <div className="hovereffect" key={i}>
        <img src={obj.thumbnail} alt={obj.caption} />
        <div className="overlay" onClick={e => openLightbox(i, e)}>
          <h2>{obj.caption}</h2>
          {/* eslint-disable-next-line */}
          <a className="info" onClick={e => onClickDelete(e, obj.id, deletePhoto)}>
            link here
          </a>
        </div>
      </div>
    );
  });

  return <div className="images-wrapper">{gallery}</div>;
}

export default connect(
  null,
  { deletePhoto }
)(RenderGallery);
