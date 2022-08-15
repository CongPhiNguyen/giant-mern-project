import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./AlbumViewing.scss";

import axios from "axios";

export default function AlbumsViewing() {
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/album/get-all-user-album",
        { params: { username: userInfo.username } },
        { withCredentials: true }
      )
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
  return <div>AlbumsViewing</div>;
}
