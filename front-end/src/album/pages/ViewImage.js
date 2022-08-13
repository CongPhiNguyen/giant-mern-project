import React from "react";
import ImageController from "../components/ImageController";
import ImageViewer from "./ImageViewer";
export default function ViewImage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <ImageController></ImageController>
        <ImageViewer></ImageViewer>
      </div>
    </div>
  );
}
