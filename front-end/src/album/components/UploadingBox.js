import React, { useEffect, useState } from "react";
import "./UploadingBox.scss";

import { BsThreeDots } from "react-icons/bs";
import axios from "axios";

export default function UploadingBox() {
  const [listImage, setListImage] = useState([]);
  const [listImageData, setListImageData] = useState([]);
  const getListImage = (e) => {
    console.log(document.querySelector("#img-input").files);
    const listFile = e.target.files;
    setListImage((prev) => {
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
  };

  const uploadListImageHandle = () => {
    const uploadImagesData = new FormData();
    listImage.forEach((img) => {
      uploadImagesData.append("listImages", img);
    });
    uploadImagesData.append("username", "congphi312");
    axios.defaults.withCredentials = true;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
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
  return (
    <div className="uploading-box-container">
      <div className="heading">
        <p className="more-icon">
          <BsThreeDots />
        </p>
        <div className="album-selection-container">
          <select className="album-selection" name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
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
                alt="image-to-upload"
                key={index}
                id={`image-upload-${index}`}
                className="img-file-to-upload"
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
