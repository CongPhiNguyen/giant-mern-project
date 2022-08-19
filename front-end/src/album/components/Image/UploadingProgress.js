import React from "react";
import "./UploadingProgress.scss";

export default function UploadingProgress(props) {
  console.log("UploadingProgress(props)", props);
  return (
    <div className="uploading-progress-container">
      Uploading
      {props.listImageData.map((imageData, index) => {
        return (
          <div className="img-progress-container">
            <img src={imageData} className="img-uploading"></img>
            <p className="image-title">{props.listImage[index].name}</p>
            <p className="progress">Uploading....</p>
          </div>
        );
      })}
    </div>
  );
}
