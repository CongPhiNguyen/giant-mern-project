import React from "react";
import "./AlbumController.scss";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { showModal } from "../../../shared/modals/ModalSlice";

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
          <Link to="/album/">View all own albums</Link>
        </li>
      </ul>
    </div>
  );
}
