import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
function Header() {
  return (
    <header className="app-navigation">
      <NavLink className="nav" to="/home">
        Home
      </NavLink>
      <NavLink className="nav" to="/sign-in">
        Sign-in
      </NavLink>
      <NavLink className="nav" to="/sign-up">
        Sign-up
      </NavLink>
      <NavLink className="nav" to="/image/">
        Image
      </NavLink>
    </header>
  );
}

export default Header;
