import React from "react";
import "./ImageDisplayer.scss";
import API from "../../../../config/API";

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
          src={`${API.PREFIX_URL}/images/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}_resize`}
          alt=""
          className="image-concrete"
        />
      </div>
      <p className="image-tag">{props.imageInfo?.imageName}</p>
    </div>
  );
}
