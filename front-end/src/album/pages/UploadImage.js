import React from "react";
import "./UploadImage.scss";
import UploadingBox from "../components/UploadingBox";

export default function UploadImage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <section className="uploading-box-wrapper">
          <UploadingBox />
        </section>
      </div>
    </div>
  );
}
