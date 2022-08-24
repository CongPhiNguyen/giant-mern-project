import React from "react";
import "./ControllBar.scss";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function ControllBar() {
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  // console.log("userInfo", Object.keys(userInfo).length);

  return (
    <div
      className={
        userInfo && Object.keys(userInfo).length !== 0
          ? "controll-bar"
          : "controll-bar hidden"
      }
    >
      <section className="content-section">
        <p className="title">My own</p>
        <div className="divider"></div>
        <NavLink to="/image/view-all-image" className="content-item">
          Images
        </NavLink>
        <NavLink to="/album" className="content-item">
          Albums
        </NavLink>
        <NavLink to="/processing" className="content-item">
          Processing
        </NavLink>
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
