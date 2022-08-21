import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AlbumsViewing.scss";
import axios from "axios";

import AlbumDisplayer from "../../components/Album/AlbumDisplayer";
import AlbumPreviewPane from "../../components/Album/AlbumPreviewPane";
import ViewHeading from "../../shared/components/ViewHeading";

import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { showModal } from "../../../shared/modals/ModalSlice";

export default function AlbumsViewing() {
  const dispatch = useDispatch();

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

  const displayModal = () => {
    dispatch(showModal("Add new album"));
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="page-container">
        <div className="view-heading-container">
          <ViewHeading
            buttonAdd={
              <button className="add-new" onClick={displayModal}>
                Add new album
              </button>
            }
          />
        </div>

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
