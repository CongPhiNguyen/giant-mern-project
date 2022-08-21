import React from "react";
import "./ViewHeading.scss";

export default function ViewHeading(props) {
  console.log(props);

  return (
    <div className="view-heading-app-container">
      <div className="search-bar">
        <input type="text" className="search-bar-box" />
        <select name="search-option" id="search-option">
          <option value="volvo">By date</option>
          <option value="saab">By name</option>
        </select>
        <button className="search">Search</button>
      </div>
      <div className="add-new-container">{props.buttonAdd}</div>
    </div>
  );
}
