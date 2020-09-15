import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav-bar-container">
      <div className="inner-nav-bar">
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/RecipeBook">Recipe Book</NavLink>
        <NavLink to="/Search">Search</NavLink>
        <NavLink to="/RecentlyDeleted">Recently Deleted</NavLink>
      </div>
    </div>
  );
}

export default NavBar;
