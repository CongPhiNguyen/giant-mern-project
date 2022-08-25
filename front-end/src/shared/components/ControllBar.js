import React from "react";
import "./ControllBar.scss";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { convertFileSizeToString } from "../../utilities/fileSize";

export default function ControllBar() {
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  const ownImageLength = useSelector(
    (state) => state.imageSlice.currentOwnImages.length
  );
  const receivedImageLength = useSelector(
    (state) => state.imageSlice.currentReceivedImages.length
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
          Images({ownImageLength})
        </NavLink>
        <NavLink to="/album" className="content-item">
          Albums({userInfo.ownAlbums?.length})
        </NavLink>
        <NavLink to="/processing" className="content-item">
          Processing
        </NavLink>
      </section>
      <section className="content-section">
        <p className="title">Received</p>
        <div className="divider"></div>
        <NavLink to="/image/view-all-received-image" className="content-item">
          Image({receivedImageLength})
        </NavLink>
        <p className="content-item">Albums</p>
      </section>
      <section className="content-section storage">
        <p className="title">Storage</p>
        <div className="divider">
          <p className="content-item">
            Storage: {convertFileSizeToString(userInfo.storage)}/2 GB
          </p>
        </div>
      </section>
    </div>
  );
}
