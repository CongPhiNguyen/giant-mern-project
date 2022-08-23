import React from "react";
import { useSelector } from "react-redux";
import { setLoadImageCount, setUploadingImageInfo } from "../../../imageSlice";
import { useDispatch } from "react-redux";

export default function ImageInfo(props) {
  const dispatch = useDispatch();

  // console.log("ImageInfo(props) ", props);
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  const imageInputInfor = useSelector(
    (state) => state.imageSlice.uploadingImageInfo
  );
  //TODO: fix to cover more case here
  const convertToComputerSize = (size) => {
    return Math.round((size * 100) / 1024) / 100 + "KB";
  };
  // console.log("imageInputInfor", imageInputInfor);
  return (
    <div className={`${props.isShow ? "block" : "hidden"}`}>
      <section className="input-area">
        {props.listImageLength !== 0 && (
          <div className="img-manage">
            <p className="img-index">{`${props.index + 1}/${
              props.listImageLength
            }`}</p>
            <p
              className="delete-icon noselect"
              onClick={() => {
                props.deleteCurrentImageFromQueue(props.index);
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
          value={imageInputInfor[props.index]?.title}
          onChange={(e) => {
            // console.log(e.target.value);
            dispatch(
              setUploadingImageInfo({
                index: props.index,
                value: {
                  title: e.target.value,
                },
              })
            );
          }}
        />
        <div className="user-info">
          <img src={userInfo?.avatarURL} alt="" className="user-avatar" />
        </div>
        <textarea
          className="image-description"
          rows="2"
          placeholder="Nhập mô tả"
          value={imageInputInfor[props.index]?.description}
          onChange={(e) => {
            dispatch(
              setUploadingImageInfo({
                index: props.index,
                value: {
                  description: e.target.value,
                },
              })
            );
          }}
        ></textarea>
        <input
          type="text"
          className="alt-text"
          placeholder="Nhập văn bản thay thế"
          value={imageInputInfor[props.index]?.alt}
          onChange={(e) => {
            dispatch(
              setUploadingImageInfo({
                index: props.index,
                value: {
                  alt: e.target.value,
                },
              })
            );
          }}
        />
      </section>
      <div className="img-attribute">
        <p className="title">Thông tin file</p>
        <p className="file-info-concrete">
          Size: {convertToComputerSize(props.size)}
          {` (${props.width}x${props.height})`}
        </p>
        <p className="file-info-concrete">Last change: {props.lastModified}</p>
      </div>
    </div>
  );
}
