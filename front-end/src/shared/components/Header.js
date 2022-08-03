import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="component-navigation">
      <NavLink className="nav" to="/home">
        Home
      </NavLink>
      <NavLink className="nav" to="/sign-in">
        Sign-in
      </NavLink>
      <NavLink className="nav" to="/sign-up">
        Sign-up
      </NavLink>
    </div>
  );
}

export default Header;
