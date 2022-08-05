import React from "react";
import ImgDisplayer from "../components/ImgDisplayer";
export default function ViewImage() {
  return (
    <div>
      <ImgDisplayer
        image={{
          source: {
            Image: {
              Format: "jpeg",
              Overlap: 1,
              Size: { Height: 30462, Width: 78000 },
              TileSize: 510,
              Url: "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/aperio/cmu-2/slide_files/",
              xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            },
            ajaxWithCredentials: false,
            crossOriginPolicy: false,
            useCanvas: true,
          },
          mpp: 0.499,
          name: "abc",
        }}
      ></ImgDisplayer>
    </div>
  );
}
