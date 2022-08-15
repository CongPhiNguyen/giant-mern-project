import React from "react";
import "./ImageControlling.scss";

import ImageController from "../components/ImageController";
import AlbumController from "../components/AlbumController";

export default function ViewImage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <ImageController></ImageController>
        <AlbumController></AlbumController>
      </div>
    </div>
  );
}
