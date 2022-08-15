import React from "react";
import "./AbstractModal.scss";
import { showModal, hideModal } from "./ModalSlice";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import AddNewAlbum from "./AddNewAlbum";

export default function AbstractModal() {
  const dispatch = useDispatch();

  const modalInfo = useSelector((state) => state.modalSlice);

  const closeModal = () => {
    dispatch(hideModal());
  };

  const chooseModal = (modalName) => {
    {
      switch (modalName) {
        case "Add new album":
          return <AddNewAlbum></AddNewAlbum>;
        default:
          return null;
      }
    }
  };
  return (
    <div
      className="modal-wrapper"
      style={{ display: modalInfo.modalDisplay ? "block" : "none" }}
    >
      <div
        className="modal-overlay"
        onClick={() => {
          closeModal();
        }}
      >
        <CSSTransition
          in={modalInfo.modalDisplay}
          timeout={1000}
          classNames="slide-top"
          mountOnEnter
          unmountOnExit
        >
          <div
            className="modal-container noselect"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {chooseModal(modalInfo.modalName)}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
