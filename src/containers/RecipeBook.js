import React from "react";
import NavBar from "../components/NavBar";
import "./RecipeBook.css";
import Modal from "../components/Modal";
import AddEditRecipeForm from "../components/AddEditRecipeForm";
import {
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../RecipeService";
import RecipeGrid from "../components/RecipeGrid";

function RecipeBook() {
  const [
    isShowingAddEditRecipeModal,
    setIsShowingAddEditRecipeModal,
  ] = React.useState(false);
  const [currentRecipe, setCurrentRecipe] = React.useState(null);
  const [originalRecipes, setOriginalRecipes] = React.useState([]);
  const [recipes, setRecipes] = React.useState(() => {
    fetchRecipes();

    return [];
  });

  function fetchRecipes() {
    getRecipes()
      .then((response) => {
        setOriginalRecipes(response.data);
        setRecipes(response.data);
      })
      .catch((error) => {
        debugger;
      });
  }

  function handleEditRecipe(recipe) {
    setCurrentRecipe(recipe);
    setIsShowingAddEditRecipeModal(true);
  }
  function handleCloseModal() {
    setIsShowingAddEditRecipeModal(false);
  }

  function handleUpdateRecipe(recipe) {
    updateRecipe(recipe._id, recipe)
      .then((response) => {
        setIsShowingAddEditRecipeModal(false);
        alert("Successfully Updated Recipe");
        fetchRecipes();
      })
      .catch((error) => {
        alert(error);
      });
  }
  function handleDeleteRecipe(recipe) {
    deleteRecipe(recipe._id)
      .then((response) => {
        setIsShowingAddEditRecipeModal(false);
        alert("Successfully Deleted Recipe");
        fetchRecipes();
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Recipes List state- product showing on recipe book page
  // Original Recipe List state-clean list
  // is the addedit recipe modal showing- state

  // modal
  // edit
  // delete
  // update

  return (
    <div className="recipe-book-container">
      {isShowingAddEditRecipeModal ? (
        <Modal>
          <AddEditRecipeForm
            existingRecipe={currentRecipe}
            handleCloseModal={handleCloseModal}
            handleUpdateRecipe={handleUpdateRecipe}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        </Modal>
      ) : null}
      <h1 className="header">Recipe Book</h1>
      <NavBar />

      <div className="recipes-container">
        <RecipeGrid recipes={recipes} handleEditRecipe={handleEditRecipe} />
        {recipes.length === 0 ? <h3>No Results Found</h3> : null}
      </div>
    </div>
  );
}

export default RecipeBook;
