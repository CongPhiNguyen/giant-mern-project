import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImagesViewing.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import ImageDisplayer from "../../components/Image/ImageDisplayer";
import ImagePreviewPane from "../../components/Image/ImagePreviewPane";
import ImageGroupDisplayer from "../../components/Image/ImageGroupDisplayer";
import ViewHeading from "../../shared/components/ViewHeading";

// Redux
import { setCurrentOwnImages } from "../../imageSlice";

export default function ImagesViewing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDisplayPreviewPane, setDisplayPreviewPane] = useState(false);
  const [imagesSelectedIndex, setImagesSelectedIndex] = useState(-1);

  const currentOwnImages = useSelector(
    (state) => state.imageSlice.currentOwnImages
  );

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
          dispatch(setCurrentOwnImages(data.data.imageInfo));
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

  const navigateToUpload = () => {
    navigate("/image/upload");
  };

  const changeCurrrentIndex = (index) => {
    setImagesSelectedIndex(index);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="page-container">
        <div className="view-heading-container">
          <ViewHeading
            buttonAdd={
              <button className="add-new" onClick={navigateToUpload}>
                Upload Image
              </button>
            }
          />
        </div>
        <div className="content-container">
          <div
            className="image-list"
            onClick={() => {
              setImagesSelectedIndex(-1);
              setDisplayPreviewPane(false);
            }}
          >
            {currentOwnImages.map((value, index) => (
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
        imageInfo={currentOwnImages[imagesSelectedIndex]}
        changeIndex={changeCurrrentIndex}
      />
    </div>
  );
}
