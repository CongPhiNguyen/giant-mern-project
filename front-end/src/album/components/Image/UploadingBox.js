import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UploadingBox.scss";

import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { Line } from "rc-progress";

import ImageInfo from "./Uploading/ImageInfo";
import { setLoadImageCount, setUploadingImageInfo } from "../../imageSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function UploadingBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listImage, setListImage] = useState([]);
  const [listImageData, setListImageData] = useState([]);
  const [listImageSaveData, setListSaveImage] = useState([]);
  const [listImageWH, setListImageWH] = useState([]);

  const [albumsInfo, setAlbumsInfo] = useState([]);
  const [currentSelectedImageIndex, setCurrentSelectedImageIndex] =
    useState(-1);

  const [percentUpload, setPercentUpload] = useState(0);

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const currentInputValue = useSelector(
    (state) => state.imageSlice.uploadingImageInfo
  );

  // Get all user albums
  useEffect(() => {
    const getAllUserAlbums = () => {
      axios
        .get(
          "http://localhost:5000/api/album/get-all-user-album",
          { params: { username: userInfo.username } },
          { withCredentials: true }
        )
        .then((data) => {
          console.log("data", data);
          setAlbumsInfo(data.data.albumList);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    if (userInfo.username) {
      getAllUserAlbums();
    }
  }, [userInfo.username]);

  const getListImage = (e) => {
    console.log(document.querySelector("#img-input").files);
    const listFile = e.target.files;

    dispatch(
      setLoadImageCount({
        length: e.target.files.length,
        fromIndex: listImage.length,
      })
    );

    setListImage((prev) => {
      return [...prev, ...listFile];
    });
    setListSaveImage((prev) => {
      return [...prev, ...listFile];
    });

    [...listFile].forEach((file) => {
      let reader = new FileReader();
      let imgData = e;
      reader.onload = (e) => {
        imgData = e.target.result;
        setListImageData((prev) => {
          return [...prev, imgData];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const callAPISendImages = (uploadImagesData) => {
    axios.defaults.withCredentials = true;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent) {
        setPercentUpload(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    };
    const url = "http://localhost:5000/api/image/upload";
    axios
      .post(url, uploadImagesData, config)
      .then((data) => {
        console.log("data", data);
        navigate("/processing");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const uploadListImageHandle = () => {
    if (listImage.length === 0) {
      toast("You must choose at least 1 images to upload");
      return;
    }

    const uploadImagesData = new FormData();
    listImage.forEach((img) => {
      uploadImagesData.append("listImages", img);
    });
    uploadImagesData.append("userID", userInfo._id);
    currentInputValue.forEach((img) => {
      uploadImagesData.append("imgInfo", JSON.stringify(img));
    });

    // Logs form data
    for (const pair of uploadImagesData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // Call api send images
    callAPISendImages(uploadImagesData);
  };

  const deleteCurrentImageFromQueue = (removeIndex) => {
    //TODO: Xóa các image ra khỏi input file
    setListImageData((prev) =>
      prev.filter((value, index) => index !== removeIndex)
    );
    setListImage((prev) =>
      prev.filter((value, index) => index !== removeIndex)
    );
    setListImageWH((prev) =>
      prev.filter((value, index) => index !== removeIndex)
    );
    listImageSaveData((prev) =>
      prev.filter((value, index) => index !== removeIndex)
    );
    setCurrentSelectedImageIndex(-1);
  };

  const onLoadImage = (e) => {
    if (
      e.target.src ===
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
    )
      return;
    if (listImage.length <= listImageWH.length) return;
    setListImageWH((prev) => {
      dispatch(
        setUploadingImageInfo({
          index: prev.length,
          value: {
            storage: listImage[prev.length]?.size,
            dimension: {
              x: e.target.naturalWidth,
              y: e.target.naturalHeight,
            },
            generateTime:
              listImage[prev.length]?.lastModifiedDate.toISOString(),
          },
        })
      );
      return [
        ...prev,
        {
          width: e.target.naturalWidth,
          height: e.target.naturalHeight,
        },
      ];
    });
  };

  console.log("currentInputValue", currentInputValue);

  return (
    <React.Fragment>
      <div className="uploading-box-container">
        <div className="percent-upload">
          {" "}
          <Line percent={percentUpload} strokeWidth={1} strokeColor="cyan" />
        </div>
        <div className="heading">
          <p className="more-icon">
            <BsThreeDots />
          </p>
          <div className="album-selection-container">
            <select
              className="album-selection"
              name="album-selection"
              id="album-upload-selection"
            >
              <option value={"none"}>...</option>
              {albumsInfo.map((value, index) => (
                <option value={value._id} key={index}>
                  {value.albumName}
                </option>
              ))}
            </select>
            <button className="select-button">Select</button>
          </div>
        </div>
        <div className="main-content">
          <div className="img-upload-container">
            {listImage.map((value, index) => {
              return (
                <img
                  src={
                    listImageData[index]
                      ? listImageData[index]
                      : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                  }
                  key={index}
                  alt=""
                  id={`image-upload-${index}`}
                  className={`img-file-to-upload ${
                    index === currentSelectedImageIndex ? "selected" : ""
                  }`}
                  onLoad={(e) => {
                    onLoadImage(e);
                  }}
                  onClick={() => {
                    setCurrentSelectedImageIndex(index);
                  }}
                />
              );
            })}
            <label className="img-picker" htmlFor="img-input">
              <img
                className="img-add"
                src="https://cdn-icons-png.flaticon.com/512/1091/1091585.png"
                alt=""
              />
            </label>
            <input
              type="file"
              id="img-input"
              style={{ display: "none" }}
              onChange={(e) => {
                getListImage(e);
              }}
              multiple="multiple"
              accept="image/gif, image/jpeg, image/png"
            ></input>
          </div>
          <div className="img-upload-infor">
            {currentSelectedImageIndex !== -1 &&
              listImageSaveData.map((imgData, index) => {
                return (
                  <ImageInfo
                    key={index}
                    isShow={index === currentSelectedImageIndex}
                    index={index}
                    listImageLength={listImage.length}
                    deleteCurrentImageFromQueue={deleteCurrentImageFromQueue}
                    size={listImage[index]?.size}
                    width={listImageWH[index]?.width}
                    height={listImageWH[index]?.height}
                    lastModified={listImage[index]?.lastModifiedDate.toString()}
                  />
                );
              })}

            <button
              className="img-uploader"
              onClick={() => {
                uploadListImageHandle();
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
