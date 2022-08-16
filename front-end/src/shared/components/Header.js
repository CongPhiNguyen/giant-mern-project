import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { parseJwt } from "../../utilities/jwt";
import { cookiesUtil } from "../../utilities/cookies";
import { useDispatch } from "react-redux";
import { setCurrentUser, setCurrentUserInformation } from "../sharedSlice";

import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenProfileNav, setOpenProfileNav] = useState(false);

  const userInfo = useSelector((state) => state.sharedSlice.currentUser);
  const userConcrete = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  useEffect(() => {
    const decodeToken = () => {
      let jwtInfor;
      try {
        // console.log(cookiesUtil.getAccessToken());
        jwtInfor = parseJwt(cookiesUtil.getAccessToken());

        if (jwtInfor.username) {
          dispatch(
            setCurrentUser({
              username: jwtInfor.username,
              email: jwtInfor.email,
            })
          );
        }
      } catch (err) {
        navigate("/sign-in");
      }
    };
    decodeToken();
    // eslint-disable-next-line
  }, [userInfo.username]);

  useEffect(() => {
    const getUserConcrete = () => {
      const url = "http://localhost:5000/api/user/get-concrete-information";
      axios
        .get(
          url,
          { params: { token: cookiesUtil.getAccessToken() } },
          { withCrendential: true }
        )
        .then((data) => {
          console.log("dataUser", data);
          dispatch(setCurrentUserInformation(data.data.userInfo));
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    getUserConcrete();
  }, [userInfo.username]);

  const logOut = () => {
    cookiesUtil.remove("_jwt");
    dispatch(setCurrentUser({}));
    navigate("/sign-in");
  };

  return (
    <header className="app-navigation">
      <div className="left-link">
        {userInfo.username && (
          <React.Fragment>
            <NavLink className="nav" to="/home">
              Home
            </NavLink>
            <NavLink className="nav" to="/image/">
              Image
            </NavLink>
          </React.Fragment>
        )}
      </div>
      <div className="right-link">
        {userInfo.username ? (
          <React.Fragment>
            <nav
              className="nav noselect"
              onClick={() => setOpenProfileNav((prev) => !prev)}
            >
              {userInfo.username}

              {isOpenProfileNav && (
                <ul className="profile-nav">
                  <li className="profile-nav-item">Profile</li>
                  <li className="profile-nav-item" onClick={logOut}>
                    Log out
                  </li>
                </ul>
              )}
            </nav>
            <img
              className="avatar-user"
              src={
                userConcrete?.avatarURL ||
                "https://pbs.twimg.com/media/E95rRTAXsAEND8Z.jpg"
              }
              onClick={() => setOpenProfileNav((prev) => !prev)}
              alt="avatar"
            ></img>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink className="nav" to="/sign-in">
              Sign-in
            </NavLink>
            <NavLink className="nav" to="/sign-up">
              Sign-up
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </header>
  );
}

export default Header;
