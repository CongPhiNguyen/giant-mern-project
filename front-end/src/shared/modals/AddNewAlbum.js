import React, { useRef } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import "./AddNewAlbum.scss";
import { toast } from "react-toastify";
import axios from "axios";

import { hideModal } from "./ModalSlice";

export default function AddNewAlbum() {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const addNewAlbumHandle = () => {
    const dataAdd = {
      albumTitle: addAlbumRef.name.current.value,
      description: addAlbumRef.description.current.value,
      userID: userInfo._id,
    };
    axios
      .post("http://localhost:5000/api/album/create-album", dataAdd, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        dispatch(hideModal());
        toast(`Album ${addAlbumRef.name.current.value} was created`);
      })
      .catch((err) => console.log(err));
  };

  const addAlbumRef = {
    name: useRef(null),
    description: useRef(null),
  };

  return (
    <div className="modal-concrete-container">
      <p className="close-btn" onClick={() => dispatch(hideModal())}>
        X
      </p>
      <div className="modal-heading">Add New Album</div>
      <div className="divider"></div>
      <div className="modal-content">
        <div className="input-section">
          <label htmlFor="input-album-name-box" className="input-label">
            Album name
          </label>
          <input
            type="text"
            id="input-album-name-box"
            className="input-box"
            ref={addAlbumRef.name}
          />
        </div>
        <div className="input-section">
          <label htmlFor="input-album-description-box" className="input-label">
            Description
          </label>
          <input
            type="text"
            id="input-album-description-box"
            className="input-box"
            ref={addAlbumRef.description}
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="modal-controller">
        <button className="add-new-album" onClick={addNewAlbumHandle}>
          Add
        </button>
      </div>
    </div>
  );
}
