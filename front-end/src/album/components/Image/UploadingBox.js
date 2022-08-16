import React, { createRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./UploadingBox.scss";

import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadingBox() {
  const [listImage, setListImage] = useState([]);
  const [listImageData, setListImageData] = useState([]);
  const [albumsInfo, setAlbumsInfo] = useState([]);
  const [currentSelectedImageIndex, setCurrentSelectedImageIndex] =
    useState(-1);
  const [listImageSaveData, setListSaveImage] = useState([]);
  const [listImageWH, setListImageWH] = useState([]);
  const [percentUpload, setPercentUpload] = useState(0);

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
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
    setListImage((prev) => {
      return [...prev, ...listFile];
    });
    setListSaveImage((prev) => {
      return [...prev, ...listFile];
    });

    [...listFile].forEach((file) => {
      let reader = new FileReader();
      let imgData;
      reader.onload = (e) => {
        imgData = e.target.result;

        setListImageData((prev) => {
          return [...prev, imgData];
        });
      };
      reader.readAsDataURL(file);
    });

    imgInputRef.push({
      titleRef: createRef(),
      descriptionRef: createRef(),
      altRef: createRef(),
    });
  };

  const uploadListImageHandle = () => {
    //TODO: Tách component chỗ này ra
    if (listImage.length === 0) {
      toast("You must choose at least 1 images to upload");
      return;
    }
    //   titleRef: createRef(),
    //   descriptionRef: createRef(),
    //   altRef: createRef(),
    let imgInfo = [];
    listImage.forEach(() => {
      imgInfo.push({
        title: "1",
        desription: "11",
        alt: "123",
        storage: 1234,
        dimension: {
          x: 100,
          y: 100,
        },
        generateTime: new Date(),
      });
    });
    // imgInputRef.map((inputRef) => {
    //   imgInfo.push({
    //     title: inputRef.titleRef.current.value,
    //     description: inputRef.descriptionRef.current.value,
    //     alt: inputRef.altRef.current.value,
    //   });
    // });
    // console.log("imgInfo", imgInfo);
    const uploadImagesData = new FormData();
    listImage.forEach((img) => {
      uploadImagesData.append("listImages", img);
    });
    uploadImagesData.append("userID", userInfo._id);
    imgInfo.forEach((img) => {
      uploadImagesData.append("imgInfo", JSON.stringify(img));
    });

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
      })
      .catch((err) => {
        console.log("err", err);
      });
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

  const convertToComputerSize = (size) => {
    return Math.round((size * 100) / 1024) / 100 + "KB";
  };

  let imgInputRef = [];

  console.log("listImageWH", listImageWH);
  return (
    <div className="uploading-box-container">
      <div className="percent-upload">{percentUpload}</div>
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
                  // console.log("e.target.src", e.target.src);
                  if (
                    e.target.src ===
                    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                  )
                    return;
                  if (listImage.length <= listImageWH.length) return;
                  setListImageWH((prev) => [
                    ...prev,
                    {
                      width: e.target.naturalWidth,
                      height: e.target.naturalHeight,
                    },
                  ]);
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
          {listImageSaveData.map((imgData, index) => {
            return (
              <div
                className={`${
                  currentSelectedImageIndex === index ? "block" : "hidden"
                }`}
              >
                <section className="input-area">
                  {currentSelectedImageIndex !== -1 && listImage.length !== 0 && (
                    <div className="img-manage">
                      <p className="img-index">{`${
                        currentSelectedImageIndex + 1
                      }/${listImage.length}`}</p>
                      <p
                        className="delete-icon noselect"
                        onClick={() => {
                          deleteCurrentImageFromQueue(
                            currentSelectedImageIndex
                          );
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  )}

                  <input
                    type="text"
                    className="title"
                    placeholder="Nhập tiêu đề"
                    ref={imgInputRef[index]?.titleRef}
                  />
                  <div className="user-info">
                    <img
                      src={userInfo?.avatarURL}
                      alt=""
                      className="user-avatar"
                    />
                    <p className="user-name">{userInfo?.username} </p>
                  </div>
                  <textarea
                    className="image-description"
                    rows="2"
                    placeholder="Nhập mô tả"
                    ref={imgInputRef[index]?.descriptionRef}
                  ></textarea>
                  <input
                    type="text"
                    className="alt-text"
                    placeholder="Nhập văn bản thay thế"
                    ref={imgInputRef[index]?.altRef}
                  />
                </section>
                <div className="img-attribute">
                  <p className="title">Thông tin file</p>
                  <p className="file-info-concrete">
                    Size:{" "}
                    {currentSelectedImageIndex !== -1 &&
                      convertToComputerSize(
                        listImage[currentSelectedImageIndex]?.size
                      )}
                    {listImageWH[currentSelectedImageIndex] &&
                      ` (${listImageWH[currentSelectedImageIndex].width}x${listImageWH[currentSelectedImageIndex].height})`}
                  </p>
                  <p className="file-info-concrete">
                    Last change:{" "}
                    {currentSelectedImageIndex !== -1 &&
                      listImage[
                        currentSelectedImageIndex
                      ]?.lastModifiedDate.toString()}
                  </p>
                </div>
              </div>
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
  );
}
