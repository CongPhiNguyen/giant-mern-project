import React from "react";
import "./ImageGroupDisplayer.scss";
import API from "../../../config/API";
const LINK_IMG = API.PREFIX_URL + "/images/";

export default function ImageGroupDisplayer(props) {
  console.log("ImageGroupDisplayer props", props);
  return (
    <div className="image-group-container">
      <img
        src={
          LINK_IMG +
          props.listImage[props.listImage.length - 1]?.imageRoot.join("/")
        }
        className="image-standing bottom"
      ></img>
      <img
        src={
          LINK_IMG +
          props.listImage[props.listImage.length - 2]?.imageRoot.join("/")
        }
        className="image-standing middle"
      ></img>
      <img
        src={
          LINK_IMG +
          props.listImage[props.listImage.length - 3]?.imageRoot.join("/")
        }
        className="image-standing top"
      ></img>
    </div>
  );
}
