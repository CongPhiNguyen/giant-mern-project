import React, { useState, useEffect } from "react";
import "./ProcessUploading.scss";

import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProcessingImages } from "../../imageSlice";
import UploadingProgress from "../../components/Image/UploadingProgress";
import API from "../../../config/API";
const uploadFilterEnum = {
  PROCESSING: "PROCESSING",
  PROCESSED: "PROCESSED",
  ALL: "ALL",
};
export default function ProcessUploading() {
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState(
    uploadFilterEnum.PROCESSING
  );

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  const processingImage = useSelector(
    (state) => state.imageSlice.processingImagesInfo
  );

  let checkingProcessInterval;
  useEffect(() => {
    checkingProcessInterval = setInterval(() => {
      callCheckProgress();
    }, 1000);
  }, [userInfo._id]);

  const callCheckProgress = () => {
    const checkForComplete = (allProcess) => {
      if (allProcess.length === 0) return true;
      else {
        return allProcess.every((value) => {
          return value.imageInfoIDs.every((image) => {
            return image.state;
          });
        });
      }
    };
    axios
      .get(
        API.PREFIX_URL + "/api/image/check-progress-upload",
        { params: { userID: userInfo._id } },
        { withCredentials: true }
      )
      .then((data) => {
        if (data.data.success) {
          console.log("data", data);
          // setCurrentData(data.data.data);
          dispatch(setProcessingImages(data.data.data));
          if (checkForComplete(data.data.data)) {
            clearInterval(checkingProcessInterval);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="page-container">
      <button
        onClick={() => {
          setCurrentFilter(uploadFilterEnum.PROCESSING);
        }}
      >
        {" "}
        Processing
      </button>
      <button
        onClick={() => {
          setCurrentFilter(uploadFilterEnum.PROCESSED);
        }}
      >
        {" "}
        Processed
      </button>
      <button
        onClick={() => {
          setCurrentFilter(uploadFilterEnum.ALL);
        }}
      >
        {" "}
        All
      </button>
      <div className="content-container">
        {processingImage
          .filter((value) => {
            if (currentFilter === uploadFilterEnum.PROCESSING)
              return value.state === "running";
            else if (currentFilter === uploadFilterEnum.PROCESSED)
              return value.state === "processed";
            else if (currentFilter === uploadFilterEnum.ALL) return true;
            else return false;
          })
          .map((value) => {
            return <UploadingProgress uploadInfo={value} />;
          })}
      </div>
    </div>
  );
}
