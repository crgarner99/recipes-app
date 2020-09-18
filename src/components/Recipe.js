import React from "react";
import "./Recipe.css";
import Collapsible from "react-collapsible";

function Recipe({ recipe, handleEditRecipe }) {
  const [isShowingIngredients, setIsShowingIngredients] = React.useState(false);
  const [isShowingInstructions, setIsShowingInstructions] = React.useState(
    false
  );
  function handleToggleIngredients(e) {
    setIsShowingIngredients(!isShowingIngredients);
    e.stopPropagation();
  }
  function handleToggleInstructions(e) {
    setIsShowingInstructions(!isShowingInstructions);
    e.stopPropagation();
  }
  return (
    <div onClick={() => handleEditRecipe(recipe)} className="recipe-holder">
      <div className="name">Name: {recipe.name}</div>
      <div className="category">Category: {recipe.category}</div>
      <div onClick={handleToggleIngredients}>Ingredients: Click Here</div>
      {isShowingIngredients ? <p>{recipe.ingredients}</p> : null}
      <div onClick={handleToggleInstructions}>Instructions: Click Here</div>
      {isShowingInstructions ? <p>{recipe.instructions}</p> : null}

      {/* <div className="ingredients">Ingredients: {recipe.ingredients}</div> */}

      {/* <div className="instructions"> Instructions: {recipe.instructions} </div> */}
      <div className="prepTime">Prep-Time: {recipe.prepTime}</div>
      <div className="totalTime">Total Time: {recipe.totalTime}</div>
      <div className="serves">Serves: {recipe.serves}</div>
    </div>
  );
}

export default Recipe;
