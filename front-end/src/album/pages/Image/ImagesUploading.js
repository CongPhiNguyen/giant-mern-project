import React from "react";
import "./ImagesUploading.scss";

import UploadingBox from "../../components/Image/UploadingBox";
import UploadBoxController from "../../components/Image/UploadBoxController";

export default function ImageUploading() {
  return (
    <React.Fragment>
      <div className="page-container">
        <div className="content-container">
          <section className="uploading-box-wrapper">
            <UploadingBox />
          </section>
        </div>
      </div>
      {/* <section className="uploading-box-controller">
        <UploadBoxController />
      </section> */}
    </React.Fragment>
  );
}
