import React, { createRef } from "react";
import "./ViewHeading.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setToSearchImage } from "../../imageSlice";
import { useDispatch } from "react-redux";
import API from "../../../config/API";
export default function ViewHeading(props) {
  console.log(props);
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const searchInfo = useSelector((state) => state.imageSlice.search);

  const searchBoxRef = createRef();
  const searchForName = () => {
    if (props.type == "image" && props.permit == "own") {
      axios.defaults.withCredentials = true;
      const url = API.PREFIX_URL + "/api/image/own/search";
      const paramToSearch = { userID: userInfo._id };
      axios
        .get(url, {
          params: {
            namePattern: searchBoxRef.current.value,
          },
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
    }
  };

  useEffect(() => {
    setToSearchImage({
      isSearching: false,
      module: "",
      searchValue: [],
    });
  }, []);
  return (
    <div className="view-heading-app-container">
      <div className="search-bar">
        <input type="text" className="search-bar-box" ref={searchBoxRef} />
        <select name="search-option" id="search-option">
          <option value="saab">By name</option>
          <option value="volvo">By date</option>
        </select>
        <button
          className="search"
          onClick={() => {
            searchForName();
          }}
        >
          Search
        </button>
      </div>
      <div className="add-new-container">{props.buttonAdd}</div>
    </div>
  );
}
