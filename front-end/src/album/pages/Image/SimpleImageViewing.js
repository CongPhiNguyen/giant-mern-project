import React, { useState } from "react";
import "./SimpleImageViewing.scss";

import { useParams } from "react-router-dom";

export default function SimpleImageViewing() {
  const params = useParams();
  const [currentZoom, setCurrentZoom] = useState(1);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [imgAttribute, setImgAttribute] = useState({
    transform: "scale(1) translateX(0%) translateY(0%)",
  });

  const calculateDisplayZoom = (zoomIndex) => {
    if (zoomIndex > 0) {
      return zoomIndex;
    } else {
      return 1 / (-zoomIndex + 1);
    }
  };

  const zoomIn = () => {
    console.log("Zoom in");

    setImgAttribute((prev) => {
      return {
        ...prev,
        transform: `scale(${calculateDisplayZoom(
          currentZoom
        )}) translateX(${currentX}%) translateY(${currentY}%)`,
      };
    });
    setCurrentZoom((prev) => {
      let nextZoom;
      if (prev === -1) {
        nextZoom = 1;
      } else {
        nextZoom = prev + 1;
      }
      return nextZoom;
    });
  };

  const zoomOut = () => {
    console.log("Zoom out");

    setImgAttribute((prev) => {
      return {
        ...prev,
        transform: `scale(${calculateDisplayZoom(
          currentZoom
        )})  translateX(${currentX}%) translateY(${currentY}%)`,
      };
    });
    setCurrentZoom((prev) => {
      let nextZoom;
      if (prev === 1) {
        nextZoom = -1;
      } else {
        nextZoom = prev - 1;
      }
      return nextZoom;
    });
  };

  const moveX = (value) => {
    console.log("Move X");
    setImgAttribute((prev) => {
      return {
        ...prev,
        transform: `scale(${calculateDisplayZoom(currentZoom)})  translateX(${
          currentX + value
        }%) translateY(${currentY}%)`,
      };
    });
    setCurrentX((prev) => prev + value);
  };

  const moveY = (value) => {
    console.log("Move Y");
    setImgAttribute((prev) => {
      return {
        ...prev,
        transform: `scale(${calculateDisplayZoom(
          currentZoom
        )})  translateX(${currentX}%) translateY(${currentY + value}%)`,
      };
    });
    setCurrentY((prev) => prev + value);
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="component-container">
          <div className="img-wrapper">
            <img
              src={`http://localhost:5000/images/${params.userID}/${params.imgID}`}
              alt=""
              className="img-concrete"
              style={imgAttribute}
            />
          </div>
          <div className="display-container">
            <button className="display-controller" onClick={zoomIn}>
              Zoom in
            </button>
            <button className="display-controller" onClick={zoomOut}>
              Zoom out
            </button>
            <button className="display-controller" onClick={() => moveX(10)}>
              {/* Left arrow */}
              &larr;
            </button>
            <button className="display-controller" onClick={() => moveX(-10)}>
              {/* Right Arrow */}
              &rarr;
            </button>
            <button className="display-controller" onClick={() => moveY(-10)}>
              {/* Top arrow */}
              &uarr;
            </button>
            <button className="display-controller" onClick={() => moveY(10)}>
              {/* Down arrow */}
              &darr;
            </button>
            <div>
              <p>currentZoom: {calculateDisplayZoom(currentZoom)}</p>
            </div>
            <div>
              <p>currentX: {currentX}</p>
              <p>currentY: {currentY}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
