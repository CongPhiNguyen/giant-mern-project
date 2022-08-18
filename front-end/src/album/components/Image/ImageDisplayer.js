import React from "react";
import "./ImageDisplayer.scss";

export default function ImageDisplayer(props) {
  console.log("props", props);

  return (
    <div
      className={
        props.selected
          ? "image-display-container selected"
          : "image-display-container"
      }
    >
      <div className="image-container">
        <img
          src={`http://localhost:5000/images/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}_resize`}
          alt=""
          className="image-concrete"
        />
      </div>
      <p className="image-tag">{props.imageInfo?.imageName}</p>
    </div>
  );
}
