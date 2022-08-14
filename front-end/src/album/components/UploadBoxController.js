import React, { useState } from "react";
import "./UploadBoxController.scss";
import { ImImages } from "react-icons/im";

export default function UploadBoxController() {
  const [listUploadBox, setListUploadBox] = useState([]);

  const addNewUploadBox = () => {
    setListUploadBox((prev) => [...prev, 1]);
  };
  return (
    <aside className="uploadbox-controll-container">
      <div className="add-uploadbox noselect" onClick={() => addNewUploadBox()}>
        +
      </div>
      <ul className="upload-box-list">
        {listUploadBox.map(() => (
          <li className="uploadbox-item">
            <ImImages size={24} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
