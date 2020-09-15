import React from "react";
import NavBar from "../components/NavBar";
import "./RecentlyDeleted.css";

function RecentlyDeleted() {
  return (
    <div className="recently-deleted-container">
      <h1 className="Header"> Recently Deleted </h1>
      <NavBar />
      <h3 className="Intro">
        Here you can find Recently Deleted Recipes. You can permanently delete
        recipes here or restore them back to your Recipe Book. Just click on the
        recipe you want and follow the instructions.
      </h3>
      <h3 className="warning">
        *Note Deleting Recipes here will permanently delete the recipe.
      </h3>
      <h2>Deleted Recipes</h2>
      <div className="recent-container">
        <div className="Recent">1</div>
        <div className="Recent">2</div>
        <div className="Recent">3</div>
        <div className="Recent">4</div>
        <div className="Recent">5</div>
        <div className="Recent">6</div>
        <div className="Recent">7</div>
        <div className="Recent">8</div>
      </div>
      <button className="SeeMore">See More...</button>
    </div>
  );
}

export default RecentlyDeleted;
