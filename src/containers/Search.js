import React from "react";
import NavBar from "../components/NavBar";
import "./Search.css";
import { getRecipes, updateRecipe, deleteRecipe } from "../RecipeService";
import AddEditRecipeForm from "../components/AddEditRecipeForm";
import RecipeGrid from "../components/RecipeGrid";
import Modal from "../components/Modal";

function Search() {
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

  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setRecipes(originalRecipes);
      return;
    }

    const filteredRecipes = originalRecipes.filter((recipe) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const recipeNameLowerCase = recipe.name.toLowerCase();
      const recipeCategoryLowerCase = recipe.category.toLowerCase();
      const recipePrepTimeLowerCase = recipe.prepTime.toLowerCase();
      const recipeTotalTimeLowerCase = recipe.totalTime.toLowerCase();
      const recipeServesLowerCase = recipe.serves.toLowerCase();
      const recipeIngredientsLowerCase = recipe.ingredients.toLowerCase();

      if (
        recipeNameLowerCase.startsWith(searchQueryLowerCase) ||
        recipeNameLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
      if (
        recipeCategoryLowerCase.startsWith(searchQueryLowerCase) ||
        recipeCategoryLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
      if (
        recipePrepTimeLowerCase.startsWith(searchQueryLowerCase) ||
        recipePrepTimeLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
      if (
        recipeTotalTimeLowerCase.startsWith(searchQueryLowerCase) ||
        recipeTotalTimeLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
      if (
        recipeIngredientsLowerCase.startsWith(searchQueryLowerCase) ||
        recipeIngredientsLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
      if (
        recipeServesLowerCase.startsWith(searchQueryLowerCase) ||
        recipeServesLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
    });

    setRecipes(filteredRecipes);
  }, [searchQuery]);

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

  function handleCloseModal() {
    setIsShowingAddEditRecipeModal(false);
  }

  function handleEditRecipe(recipe) {
    setCurrentRecipe(recipe);
    setIsShowingAddEditRecipeModal(true);
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

  return (
    <div className="Search">
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
      <h1 className="header">Search Page</h1>
      <NavBar />
      <input
        type="text"
        className="search-input"
        placeholder="Search for Name, Category, or anything in the recipe."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <RecipeGrid recipes={recipes} handleEditRecipe={handleEditRecipe} />
      {recipes.length === 0 ? <h3>No Results Found</h3> : null}
    </div>
  );
}

export default Search;
