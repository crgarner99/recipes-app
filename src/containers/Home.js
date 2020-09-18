import React from "react";
import "./Home.css";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import AddEditRecipeForm from "../components/AddEditRecipeForm";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../RecipeService";
import { Link } from "react-router-dom";
// import RecipeGrid from "../components/RecipeGrid";

function Home() {
  const [recentRecipes, setRecentRecipes] = React.useState(() => {
    fetchRecipes();

    return [];
  });
  function fetchRecipes() {
    getRecipes()
      .then((response) => {
        //TODO: get the 8 most recent per unixtime, use slice
        setRecentRecipes(response.data);
      })
      .catch((error) => {
        debugger;
      });
  }

  const [
    isShowingAddEditRecipeModal,
    setIsShowingAddEditRecipeModal,
  ] = React.useState(false);
  const [currentRecipe, setCurrentRecipe] = React.useState(null);
  // const [recipes, setRecipes] = React.useState(() => {
  //   fetchRecipes();

  //   return [];
  // });

  function handleAddRecipeClick() {
    setCurrentRecipe(null);
    setIsShowingAddEditRecipeModal(true);
  }
  function handleEditRecipeClick(recipe) {
    setCurrentRecipe(recipe);
    setIsShowingAddEditRecipeModal(true);
  }
  function handleCloseModal() {
    setIsShowingAddEditRecipeModal(false);
  }
  function handleCreateRecipe(recipe) {
    createRecipe(recipe)
      .then((response) => {
        setIsShowingAddEditRecipeModal(false);
        alert("Congrats! Your New Recipe is in your Recipe Book");
        fetchRecipes();
      })
      .catch((error) => {
        alert(error);
      });
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
  // function handleEditRecipe(recipe) {
  //   setCurrentRecipe(recipe);
  //   setIsShowingAddEditRecipeModal(true);
  // }

  function handleDeleteRecipe(recipe) {
    deleteRecipe(recipe._id)
      .then((response) => {
        setIsShowingAddEditRecipeModal(false);
        alert(`${recipe.name} has been Deleted.`);
        fetchRecipes();
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="home-container">
      <h1 className="Header"> Digital Recipe </h1>
      <NavBar />
      <h3 className="Intro">
        Welcome to Digital Recipe, below you have the option to create a new
        recipe or to upload an image to have the text of an image read and added
        as a recipe. No worries if it doesnt read all the text correclty you can
        always edit your recipes and update them to be accurate.{" "}
      </h3>
      <div className="create-modal">
        <button className="create" onClick={handleAddRecipeClick}>
          Create New Recipe
        </button>
        {isShowingAddEditRecipeModal ? (
          <Modal>
            <AddEditRecipeForm
              existingRecipe={currentRecipe}
              handleCloseModal={handleCloseModal}
              handleCreateRecipe={handleCreateRecipe}
              handleUpdateRecipe={handleUpdateRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          </Modal>
        ) : null}
      </div>

      <h2>Recent Recipes</h2>

      <div className="recent-container">
        {recentRecipes && recentRecipes.length > 0
          ? recentRecipes.map((recipe) => {
              return (
                <div
                  className="Recent"
                  key={recipe._id}
                  onClick={() => handleEditRecipeClick(recipe)}
                >
                  {recipe.name}
                </div>
              );
            })
          : null}
        {/* <RecipeGrid recipes={recipes} handleEditRecipe={handleEditRecipe} /> */}
      </div>
      <Link to="./RecipeBook">
        <button className="see-more">See More...</button>
      </Link>
    </div>
  );
}

export default Home;
