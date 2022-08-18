import React, { useEffect, useState } from "react";
import "./ImagePreviewPane.scss";
import { Link } from "react-router-dom";

import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

export default function ImagePreviewPane(props) {
  console.log(props);
  // console.log(props.imageInfo?.haveAlbums?.length);

  const [ownimageInfo, setOwnimageInfo] = useState({});

  const calculateTime = (timeString) => {
    const postTime = new Date(timeString);
    var diff = Math.abs(new Date() - postTime);
    if (diff < 1000 * 60) {
      return "0 minutes ago";
    } else if (diff < 1000 * 60 * 60) {
      return Math.floor(diff / 1000 / 60) + " minutes ago";
    } else if (diff < 1000 * 60 * 60 * 24) {
      return Math.floor(diff / 1000 / 60 / 60) + " hours ago";
    } else if (diff < 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(diff / 1000 / 60 / 60 / 24) + " days ago";
    } else if (diff < 1000 * 60 * 60 * 24 * 365) {
      return Math.floor(diff / 1000 / 60 / 60 / 24 / 30) + " months ago";
    } else {
      return Math.floor(diff / 1000 / 60 / 60 / 24 / 365) + " years ago";
    }
  };
  //TODO: Làm một hàm tính ngày và thời gian để sử dụng chung ở đây
  const toReadAbleDate = (dateString) => {
    const splitInfo = dateString.slice(0, 10).split("-");
    return splitInfo[2] + "/" + splitInfo[1] + "/" + splitInfo[0];
  };

  useEffect(() => {
    const getUserInformationByID = (id) => {
      axios.defaults.withCredentials = true;
      const url = "http://localhost:5000/api/user/";
      axios
        .get(url + id)
        .then((data) => {
          setOwnimageInfo(data.data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    if (props.imageInfo?.ownPeople)
      getUserInformationByID(props.imageInfo?.ownPeople);
  }, [props.imageInfo?.ownPeople]);

  // console.log("ownimageInfo", ownimageInfo);
  return (
    <CSSTransition
      in={props.display}
      timeout={200}
      classNames="slide-right"
      mountOnEnter
      unmountOnExit
    >
      <div className="preview-pane-controller">
        <div
          className="preview-pane-close noselect"
          onClick={() => props.closePreviewPane()}
        >
          X
        </div>
        <section className="information-detail information-section">
          <p className="title">Details</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">Children albums:</label>
            {props.imageInfo?.haveAlbums?.length ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Total images:</label>
            {props.imageInfo?.haveImages?.length ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Storage:</label>
            {props.imageInfo?.storage ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Lastchange :</label>
            {props.imageInfo?.updatedAt
              ? toReadAbleDate(props.imageInfo?.updatedAt) +
                " " +
                calculateTime(props.imageInfo?.updatedAt)
              : "Không xác định"}
          </p>
        </section>
        <section className="information-attribute information-section">
          <p className="title">Attribute</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">Own by:</label>
            <img className="own-avatar" src={ownimageInfo?.avatarURL}></img>
            <p className="own-username">{ownimageInfo?.username || ""}</p>
          </p>
          <p className="information-concrete">
            <label className="information-label">Description:</label>
            {props.imageInfo?.description}
          </p>
          <p className="information-concrete">
            <label className="information-label">Location:</label>
            {`${ownimageInfo?.username}/${props.imageInfo?.albumName}`}
          </p>
        </section>
        <section className="information-permission information-section">
          <p className="title">Permission</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">ShareList:</label>
            {props.imageInfo?.viewedPeople.length +
              " people viewed this album" ?? ""}
          </p>
        </section>
        <section className="information-mangage information-section">
          <p className="title">Manage</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">View:</label>
            <Link
              to={`/image/view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
            >
              View with opensea
            </Link>
            <Link
              to={`/image/simple-view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
            >
              SimpleView
            </Link>
          </p>
        </section>
      </div>
    </CSSTransition>
  );
}
