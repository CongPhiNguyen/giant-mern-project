import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ImagesViewing.scss";

import axios from "axios";
import ImageDisplayer from "../../components/Image/ImageDisplayer";
import ImagePreviewPane from "../../components/Image/ImagePreviewPane";
import ImageGroupDisplayer from "../../components/Image/ImageGroupDisplayer";

export default function ImagesViewing() {
  const [imagesInfo, setImagesInfo] = useState([]);
  const [isDisplayPreviewPane, setDisplayPreviewPane] = useState(false);
  const [imagesSelectedIndex, setImagesSelectedIndex] = useState(-1);

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  useEffect(() => {
    const getAllUserOwnImage = () => {
      axios
        .get(
          "http://localhost:5000/api/image/get-all-own-images",
          { params: { userID: userInfo._id } },
          { withCredentials: true }
        )
        .then((data) => {
          console.log("data", data);
          setImagesInfo(data.data.imageInfo);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    getAllUserOwnImage();
  }, [userInfo._id]);

  const closePreviewPane = () => {
    setDisplayPreviewPane(false);
  };

  // console.log("userInfo", userInfo);

  return (
    <div style={{ display: "flex" }}>
      <div className="page-container">
        <div className="content-container">
          <div
            className="image-list"
            onClick={() => {
              setImagesSelectedIndex(-1);
              setDisplayPreviewPane(false);
            }}
          >
            {/* {imagesInfo?.length > 2 && (
              <ImageGroupDisplayer listImage={imagesInfo} />
            )} */}
            {imagesInfo.map((value, index) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setImagesSelectedIndex(index);
                  setDisplayPreviewPane(true);
                }}
              >
                <ImageDisplayer
                  imageInfo={value}
                  selected={index === imagesSelectedIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ImagePreviewPane
        closePreviewPane={closePreviewPane}
        display={isDisplayPreviewPane}
        imageInfo={imagesInfo[imagesSelectedIndex]}
      />
    </div>
  );
}
