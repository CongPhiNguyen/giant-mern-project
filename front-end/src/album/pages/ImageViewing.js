import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";

import "./ImageViewing.scss";

export default function ImageViewing() {
  const [viewer1, setViewer1] = useState();
  useEffect(() => {
    setViewer1(
      OpenSeadragon({
        id: "slide1",
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        tileSources: {
          Image: {
            xmlns: "https://schemas.microsoft.com/deepzoom/2008",
            Url: "http://localhost:5000/privates/output-ZGDZQ1/output_files/",
            Format: "png",
            Overlap: "0",
            TileSize: "64",
            Size: {
              Width: `${564 * 4}`,
              Height: `${705 * 4}`,
            },
          },
        },
        smoothTileEdgesMinZoom: 1,
        animationTime: 1,
        opacity: 1,
      })
    );
  }, []);

  return (
    <div>
      <div id="slide1" style={{ width: "100%", height: "80vh" }}></div>
    </div>
  );
}
