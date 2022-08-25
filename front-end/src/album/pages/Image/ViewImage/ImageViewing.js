import React, { useEffect, useState } from "react";
import OpenSeadragon from "openseadragon";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ImageViewing.scss";

export default function ImageViewing() {
  const params = useParams();
  const [viewer1, setViewer1] = useState();
  const [imgInfo, setImgInfo] = useState({});
  const [havePermission, setHavePermission] = useState(false);
  useEffect(() => {
    const getImageInfo = () => {
      axios.defaults.withCredentials = true;
      const url = "http://localhost:5000/api/image/get-concrete-image";
      axios
        .get(url, {
          params: {
            ...params,
          },
        })
        .then((data) => {
          console.log("data", data);

          if (data.data.imgInfo) {
            setHavePermission(true);
            setImgInfo(data.data.imgInfo);
          } else setHavePermission(false);
        })
        .catch((err) => {
          setHavePermission(false);
          console.log("err", err);
        });
    };
    getImageInfo();
  }, [params.userID, params.imgID]);

  useEffect(() => {
    if (Object.keys(imgInfo).length !== 0) {
      viewer1 && viewer1.destroy();
      setViewer1(
        OpenSeadragon({
          id: "slide1",
          prefixUrl: "//openseadragon.github.io/openseadragon/images/",
          tileSources: {
            Image: {
              xmlns: "https://schemas.microsoft.com/deepzoom/2008",
              Url: `http://localhost:5000/images/dzi/${params.userID}/${params.imgID}/`,
              Format: "jpeg",
              Overlap: "0",
              TileSize: "256",
              Size: {
                Width: `${imgInfo.dimension.x}`,
                Height: `${imgInfo.dimension.y}`,
              },
            },
          },
          smoothTileEdgesMinZoom: 1,
          animationTime: 1,
          opacity: 1,
        })
      );
    }
  }, [imgInfo]);
  console.log(params);
  return (
    <div>
      {!havePermission ? (
        <p>You don't have permission to access this file</p>
      ) : (
        <div
          id="slide1"
          style={{ width: "100%", height: "80vh", border: "1px solid #333" }}
        ></div>
      )}

      {/* {noPermission ? <></>} */}
    </div>
  );
}
