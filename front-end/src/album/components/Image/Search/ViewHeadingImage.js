import React, { createRef, useState, useEffect } from "react";
import "./ViewHeadingImage.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToSearchImage } from "../../../imageSlice";
import { useNavigate } from "react-router-dom";

export default function ViewHeadingImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState("name");

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const searchBoxRef = createRef();
  const fromDate = createRef();
  const toDate = createRef();

  const searchForValue = () => {
    axios.defaults.withCredentials = true;
    const url = "http://localhost:5000/api/image/own/search";
    const paramToSearch = { userID: userInfo._id };
    if (searchOption === "name") {
      paramToSearch.namePattern = searchBoxRef.current.value;
    }
    if (searchOption === "alt") {
      paramToSearch.altPattern = searchBoxRef.current.value;
    }
    if (searchOption === "description") {
      paramToSearch.descriptionPattern = searchBoxRef.current.value;
    }
    if (searchOption === "date") {
      paramToSearch.fromDate = fromDate.current.value;
      paramToSearch.toDate = toDate.current.value;
    }
    axios
      .get(url, {
        params: paramToSearch,
      })
      .then((data) => {
        console.log("data", data);
        dispatch(
          setToSearchImage({
            isSearching: true,
            module: "ownImage",
            searchValue: data.data.data,
          })
        );
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    dispatch(
      setToSearchImage({
        isSearching: false,
        module: "",
        searchValue: [],
      })
    );
    //eslint-disable-next-line
  }, []);

  const navigateToUpload = () => {
    navigate("/image/upload");
  };
  return (
    <div className="view-heading-app-container">
      <div className="search-bar">
        {searchOption === "date" ? (
          <div>
            <p>From date:</p>
            <input type="date" ref={fromDate} defaultValue={new Date()} />
            <p>To date:</p>
            <input type="date" ref={toDate} defaultValue={new Date()} />
          </div>
        ) : (
          <input type="text" className="search-bar-box" ref={searchBoxRef} />
        )}

        <select
          name="search-option"
          id="search-option"
          onChange={(e) => {
            console.log(e.target.value);
            setSearchOption(e.target.value);
          }}
        >
          <option value="name">By name</option>
          <option value="description">By description</option>
          <option value="alt">By alt</option>
          <option value="date">By date</option>
        </select>
        <button
          className="search"
          onClick={() => {
            searchForValue();
          }}
        >
          Search
        </button>
      </div>
      <div className="add-new-container">
        <button className="add-new" onClick={navigateToUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
}
