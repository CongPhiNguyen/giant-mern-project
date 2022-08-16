import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AlbumsViewing.scss";
import axios from "axios";

import AlbumDisplayer from "../../components/Album/AlbumDisplayer";
import AlbumPreviewPane from "../../components/Album/AlbumPreviewPane";

export default function AlbumsViewing() {
  const [albumsInfo, setAlbumsInfo] = useState([]);
  const [albumsSelectedIndex, setAlbumsSelectedIndex] = useState(-1);
  const [isDisplayPreviewPane, setDisplayPreviewPane] = useState(false);

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

  const closePreviewPane = () => {
    setDisplayPreviewPane(false);
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="page-container">
        <div className="content-container">
          <div
            className="album-list"
            onClick={() => {
              setAlbumsSelectedIndex(-1);
              setDisplayPreviewPane(false);
            }}
          >
            {albumsInfo?.map((album, index) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setAlbumsSelectedIndex(index);
                  setDisplayPreviewPane(true);
                }}
              >
                <AlbumDisplayer
                  album={album}
                  key={index}
                  selected={index === albumsSelectedIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <AlbumPreviewPane
        closePreviewPane={closePreviewPane}
        display={isDisplayPreviewPane}
        albumInfo={albumsInfo[albumsSelectedIndex]}
      />
    </div>
  );
}
