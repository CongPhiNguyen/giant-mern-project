import React from "react";
import "./ImageControlling.scss";

import ImageController from "../components/ImageController";

export default function ViewImage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <ImageController></ImageController>
      </div>
    </div>
  );
}