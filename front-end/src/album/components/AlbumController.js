import React from "react";
import "./AlbumController.scss";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { showModal } from "../../shared/modals/ModalSlice";

export default function AlbumController() {
  const dispatch = useDispatch();
  const displayModal = () => {
    dispatch(showModal("Add new album"));
  };
  return (
    <div className="album-controller">
      <h3>Album controller</h3>
      <ul>
        <li className="feature-selection" onClick={() => displayModal()}>
          Add new album
        </li>
        <li className="feature-selection">
          <NavLink to="/album/">View all albums</NavLink>
        </li>
      </ul>
    </div>
  );
}
