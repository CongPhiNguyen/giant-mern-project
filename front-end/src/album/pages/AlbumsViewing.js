import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AlbumViewing.scss";
import AlbumDisplayer from "../components/AlbumDisplayer";
import axios from "axios";

export default function AlbumsViewing() {
  const [albumsInfo, setAlbumsInfo] = useState([]);
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
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
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="album-list">
          {albumsInfo.map((album, index) => (
            <AlbumDisplayer album={album} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
