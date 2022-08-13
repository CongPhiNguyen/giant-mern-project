import React from "react";
import "./ImageController.scss";
import { useNavigate } from "react-router-dom";

export default function ImageController() {
  const navigate = useNavigate();
  return (
    <div className="image-controller">
      <p
        className="feature-selection"
        onClick={() => {
          navigate("/image/upload");
        }}
      >
        Upload single image
      </p>
      <p className="feature-selection">Upload multi images</p>
    </div>
  );
}