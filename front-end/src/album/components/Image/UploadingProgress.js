import React from "react";
import "./UploadingProgress.scss";

import { toReadAbleDateTime } from "../../../utilities/dayTime";
const renderLinkImage = (imageRoots) => {
  try {
    if (imageRoots.length == 2)
      return `http://localhost:5000/images/${imageRoots[0]}/${imageRoots[1]}_resize`;
    else return "";
  } catch (e) {
    return "";
  }
};

export default function UploadingProgress(props) {
  console.log("UploadingProgress(props)", props);
  const uploadingInfo = props.uploadInfo;
  return (
    <div className="uploading-progress-container">
      <h3>{uploadingInfo.state == "running" ? "Processing" : "Complete"}</h3>
      <p>Start time: {toReadAbleDateTime(uploadingInfo.createdAt)} </p>
      <p>End time: {toReadAbleDateTime(uploadingInfo.updatedAt)} </p>
      {uploadingInfo.imageInfoIDs.map((imageData, index) => {
        console.log(imageData);
        return (
          <div className="img-progress-container" key={index}>
            <img
              src={renderLinkImage(imageData.id.imageRoot)}
              className="img-uploading"
              alt={imageData.id.alt}
            ></img>
            <p className="image-title">{imageData.id.imageName}</p>
            <p className="progress">
              {imageData.state ? "Uploaded" : "Uploading...."}
            </p>
            <p className="progress">View more</p>
          </div>
        );
      })}
    </div>
  );
}
