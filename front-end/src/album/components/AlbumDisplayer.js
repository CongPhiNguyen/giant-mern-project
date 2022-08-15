import React from "react";
import "./AlbumDisplayer.scss";

export default function AlbumDisplayer(props) {
  console.log(props);
  return (
    <div className="displayer-container">
      <div className="image-symbols">
        <img
          className="image-left"
          src="https://i.pinimg.com/736x/d2/ef/c9/d2efc90c6c6cfba0349971aa14f2f9e3.jpg"
        ></img>
        <div className="images-right">
          <img
            className="image-right image-top"
            src="https://i.pinimg.com/736x/ec/46/21/ec46213ad67b7041fdbbda30ae363df1.jpg"
          ></img>
          <img
            className="image-right image-bottom"
            src="https://i.pinimg.com/564x/bd/51/57/bd51576c1ad0511ad7f462c5fd8a8e3f.jpg"
          ></img>
        </div>
      </div>
      <p className="name-tag">{props.album.albumName}</p>
      {/* <p>{JSON.stringify(props)}</p> */}
    </div>
  );
}
