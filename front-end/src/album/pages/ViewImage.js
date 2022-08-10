import React from "react";
import ImgDisplayer from "../components/ImgDisplayer";
export default function ViewImage() {
  return (
    <div className="app-container">
      <ImgDisplayer
        image={
          "https://i.pinimg.com/564x/d5/36/0b/d5360b3d7960037bc5bcf3c14159db9d.jpg"
        }
      ></ImgDisplayer>
    </div>
  );
}
