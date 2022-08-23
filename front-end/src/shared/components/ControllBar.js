import React from "react";
import "./ControllBar.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ControllBar() {
  const navigate = useNavigate();
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  // console.log("userInfo", Object.keys(userInfo).length);

  return (
    <div
      className={
        userInfo && Object.keys(userInfo).length != 0
          ? "controll-bar"
          : "controll-bar hidden"
      }
    >
      <section className="content-section">
        <p className="title">My own</p>
        <div className="divider"></div>
        <p
          className="content-item"
          onClick={() => {
            navigate("/image/view-all-image");
          }}
        >
          Images
        </p>
        <p
          className="content-item"
          onClick={() => {
            navigate("/album");
          }}
        >
          Albums
        </p>
        <p
          className="content-item"
          onClick={() => {
            navigate("/processing");
          }}
        >
          {/* TODO: Cập nhật % ở đây và hiện lên khi đang upload */}
          Processing
        </p>
      </section>
      <section className="content-section">
        <p className="title">Received</p>
        <div className="divider"></div>
        <p className="content-item">Images</p>
        <p className="content-item">Albums</p>
      </section>
    </div>
  );
}
