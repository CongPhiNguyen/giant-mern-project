import React from "react";
import "./ImageControlling.scss";

import ImageController from "../../components/Image/ImageController";
import AlbumController from "../../components/Album/AlbumController";

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
