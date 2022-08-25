import React, { useState, createRef, useEffect } from "react";
import "./ImagePermission.scss";
import API from "../../config/API";
import axios from "axios";
import { useSelector } from "react-redux";
import { hideModal } from "./ModalSlice";
import { useDispatch } from "react-redux";
export default function ImagePermission() {
  const dispatch = useDispatch();
  const [paginationArr, setPaginationArr] = useState([]);
  const userSearchRef = createRef();
  const [userResult, setUserResult] = useState([]);
  const [isSharedIndexSearch, setIsSharedIndexSearch] = useState([]);
  const [sharedUserInfo, setSharedUserInfo] = useState([]);
  const [isBanIndex, setIsBanIndex] = useState([]);

  const currentSharedImage = useSelector(
    (state) => state.imageSlice.currentSharedImageInfo
  );

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const searchUser = () => {
    axios.defaults.withCredentials = true;
    const url = API.PREFIX_URL + "/api/user/search";
    axios
      .get(url, {
        params: { pattern: userSearchRef.current.value, userID: userInfo._id },
      })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          setUserResult(data.data.userInfo);
          setIsSharedIndexSearch([]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const addPermission = (userID, imageID, index) => {
    axios.defaults.withCredentials = true;
    const url = API.PREFIX_URL + "/api/user/granted-access";
    axios
      .patch(url, { userID: userID, imageID: imageID })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          setIsSharedIndexSearch((prev) => [...prev, index]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const listUserID = currentSharedImage.sharedPeople;
    const url = API.PREFIX_URL + "/api/user/get-users-info";
    axios
      .get(url, { params: { userList: listUserID } })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          // console.log(data.data.userInfo);
          setSharedUserInfo(data.data.userInfo);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [currentSharedImage._id]);

  const banUser = (userID, imageID, index) => {
    axios.defaults.withCredentials = true;
    const url = API.PREFIX_URL + "/api/user/ban-access";
    axios
      .patch(url, { userID: userID, imageID: imageID })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          setIsBanIndex((prev) => [...prev, index]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="modal-concrete-container">
      <p
        onClick={() => {
          dispatch(hideModal());
        }}
      >
        X
      </p>
      <div className="title">Shared list</div>

      <ul className="tab-controll-container">
        <li
          className={
            paginationArr.indexOf(0) !== -1
              ? "tab-controll-concrete active"
              : "tab-controll-concrete"
          }
          onClick={() => {
            setPaginationArr((prev) => {
              if (prev.indexOf(0) === -1) {
                return [...prev, 0];
              } else return prev.filter((value) => value !== 0);
            });
          }}
        >
          Permission
        </li>
        <li
          className={
            paginationArr.indexOf(1) !== -1
              ? "tab-controll-concrete active"
              : "tab-controll-concrete"
          }
          onClick={() => {
            setPaginationArr((prev) => {
              if (prev.indexOf(1) === -1) {
                return [...prev, 1];
              } else return prev.filter((value) => value !== 1);
            });
          }}
        >
          Grant access
        </li>
      </ul>
      <ul className="tab-container">
        <li
          className={
            paginationArr.indexOf(0) !== -1
              ? "tab-concrete tab-permission"
              : "hidden"
          }
        >
          <h4 className="sub-title">Shared people list</h4>
          <ul className="list-shared-user">
            {sharedUserInfo.map((user, index) => {
              return (
                <li className="user-concrete">
                  <p className="name">{user.username}</p>
                  {isBanIndex.indexOf(index) === -1 ? (
                    <button
                      onClick={() =>
                        banUser(user._id, currentSharedImage._id, index)
                      }
                    >
                      Ban this user
                    </button>
                  ) : (
                    "Banned"
                  )}
                </li>
              );
            })}
          </ul>
        </li>
        <li
          className={
            paginationArr.indexOf(1) !== -1
              ? "tab-concrete tab-grant-access"
              : "hidden"
          }
        >
          <h4 className="sub-title">Grant Access</h4>
          <div className="search">
            <input type="text" className="search-box" ref={userSearchRef} />
            <button
              className="search-sellect"
              onClick={() => {
                searchUser();
              }}
            >
              Search
            </button>
          </div>
          <span>Find by email or username</span>
          <div className="found-user">
            {userResult.map((user, index) => {
              return (
                <div className="user-info-box">
                  <div className="avatar-container">
                    <img src={user.avatarURL} className="avatar-img"></img>
                  </div>
                  <div className="infor">
                    <p className="info-concrete">Username: {user.username}</p>
                    <p className="info-concrete">Email: {user.email}</p>
                  </div>

                  {/* Check for shared search and share after that */}
                  {user.receivedImages.indexOf(currentSharedImage._id) === -1 &&
                  isSharedIndexSearch.indexOf(index) === -1 ? (
                    <button
                      className="add-permission"
                      onClick={() => {
                        addPermission(user._id, currentSharedImage._id, index);
                      }}
                    >
                      Share
                    </button>
                  ) : (
                    "Shared"
                  )}
                </div>
              );
            })}
          </div>
        </li>
      </ul>
    </div>
  );
}
