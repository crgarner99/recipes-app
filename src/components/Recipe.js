import React from "react";
import "./Recipe.css";

function Recipe({ recipe, handleEditRecipe }) {
  return (
    <div onClick={() => handleEditRecipe(recipe)} className="recipe-holder">
      <div className="name">Name: {recipe.name}</div>
      <div className="category">Category: {recipe.category}</div>
      <div className="ingredients">Ingredients: {recipe.ingredients}</div>
      <div className="instructions">Instructions: {recipe.instructions}</div>
      <div className="prepTime">Prep-Time: {recipe.prepTime}</div>
      <div className="totalTime">Total Time: {recipe.totalTime}</div>
      <div className="serves">Serves: {recipe.serves}</div>
    </div>
  );
}

export default Recipe;
