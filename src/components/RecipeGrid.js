import React from "react";
import Recipe from "./Recipe";
import "./RecipeGrid.css";

function RecipeGrid({ recipes, handleEditRecipe }) {
  return (
    <div className="recipe-grid-container">
      {recipes && recipes.length
        ? recipes.map((recipe) => {
            return (
              <Recipe
                recipe={recipe}
                key={recipe._id}
                handleEditRecipe={handleEditRecipe}
              />
            );
          })
        : null}
    </div>
  );
}

export default RecipeGrid;
