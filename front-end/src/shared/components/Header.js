import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
function Header() {
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
        <NavLink className="nav" to="/sign-in">
          Sign-in
        </NavLink>
        <NavLink className="nav" to="/sign-up">
          Sign-up
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
