import React, { useEffect, useState } from "react";
import "./AlbumPreviewPane.scss";

import axios from "axios";
import { CSSTransition } from "react-transition-group";
import API from "../../../config/API";

export default function PreviewPane(props) {
  console.log(props.albumInfo);
  // console.log(props.albumInfo?.haveAlbums?.length);

  const [ownAlbumInfo, setOwnAlbumInfo] = useState({});

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
      const url = API.PREFIX_URL + "/api/user/";
      axios
        .get(url + id)
        .then((data) => {
          setOwnAlbumInfo(data.data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    if (props.albumInfo?.ownPeople)
      getUserInformationByID(props.albumInfo?.ownPeople);
  }, [props.albumInfo]);

  // console.log("ownAlbumInfo", ownAlbumInfo);
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
            {props.albumInfo?.haveAlbums?.length ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Total images:</label>
            {props.albumInfo?.haveImages?.length ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Storage:</label>
            {props.albumInfo?.storage ?? " Không xác định"}
          </p>
          <p className="information-concrete">
            <label className="information-label">Lastchange :</label>
            {props.albumInfo?.updatedAt
              ? toReadAbleDate(props.albumInfo?.updatedAt) +
                " " +
                calculateTime(props.albumInfo?.updatedAt)
              : "Không xác định"}
          </p>
        </section>
        <section className="information-attribute information-section">
          <p className="title">Attribute</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">Own by:</label>
            <img className="own-avatar" src={ownAlbumInfo?.avatarURL}></img>
            <p className="own-username">{ownAlbumInfo?.username || ""}</p>
          </p>
          <p className="information-concrete">
            <label className="information-label">Description:</label>
            {props.albumInfo?.description}
          </p>
          <p className="information-concrete">
            <label className="information-label">Location:</label>
            {`${ownAlbumInfo?.username}/${props.albumInfo?.albumName}`}
          </p>
        </section>
        <section className="information-permission information-section">
          <p className="title">Permission</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">ShareList:</label>
            {props.albumInfo?.viewedPeople.length +
              " people viewed this album" ?? ""}
          </p>
        </section>
      </div>
    </CSSTransition>
  );
}
