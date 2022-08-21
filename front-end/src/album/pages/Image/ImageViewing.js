import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import { useParams } from "react-router-dom";

import "./ImageViewing.scss";

export default function ImageViewing() {
  const params = useParams();
  const [viewer1, setViewer1] = useState();
  useEffect(() => {
    setViewer1(
      OpenSeadragon({
        id: "slide1",
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        tileSources: {
          Image: {
            xmlns: "https://schemas.microsoft.com/deepzoom/2008",
            Url: `http://localhost:5000/images/dzi/${params.userID}/${params.imgID}/`,
            Format: "png",
            Overlap: "0",
            TileSize: "256",
            Size: {
              Width: `${15600}`,
              Height: `${11400}`,
            },
          },
        },
        smoothTileEdgesMinZoom: 1,
        animationTime: 1,
        opacity: 1,
      })
    );
  }, [params.userID, params.imgID]);
  console.log(params);
  return (
    <div>
      <div id="slide1" style={{ width: "100%", height: "80vh" }}></div>
    </div>
  );
}
