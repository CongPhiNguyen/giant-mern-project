import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { parseJwt } from "../../utilities/jwt";
import { cookiesUtil } from "../../utilities/cookies";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../sharedSlice";

import "./Header.scss";

function Header() {
  const userInfo = useSelector((state) => {
    console.log(state);
    return state.sharedSlice.currentUser;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const decodeToken = () => {
      let jwtInfor;
      try {
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
      // Handle JWT
      // console.log(jwtInfor);
    };
    decodeToken();
  }, []);
  return (
    <header className="app-navigation">
      <div className="left-link">
        <NavLink className="nav" to="/home">
          Home
        </NavLink>
        <NavLink className="nav" to="/image/">
          Image
        </NavLink>
      </div>
      <div className="right-link">
        {userInfo.username ? (
          <React.Fragment>
            <NavLink className="nav" to="/profile">
              {userInfo.username}
            </NavLink>
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
