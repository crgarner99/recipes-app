import React from "react";
import "./AddEditRecipeForm.css";
import categories from "../categories.json";
import prepTimeOptions from "../preptime.json";
import totalTimeOptions from "../totaltime.json";
import servesOptions from "../serves.json";

function AddEditRecipeForm({
  handleCloseModal,
  handleCreateRecipe,
  existingRecipe,
  handleUpdateRecipe,
  handleDeleteRecipe,
}) {
  const [name, setName] = React.useState(
    existingRecipe ? existingRecipe.name : ""
  );

  const [category, setCategory] = React.useState(
    existingRecipe ? existingRecipe.category : ""
  );
  const [ingredients, setIngredients] = React.useState(
    existingRecipe ? existingRecipe.ingredients : ""
  );
  const [instructions, setInstructions] = React.useState(
    existingRecipe ? existingRecipe.instructions : ""
  );
  const [prepTime, setPrepTime] = React.useState(
    existingRecipe ? existingRecipe.prepTime : ""
  );
  const [totalTime, setTotalTime] = React.useState(
    existingRecipe ? existingRecipe.totalTime : ""
  );
  const [serves, setServes] = React.useState(
    existingRecipe ? existingRecipe.serves : ""
  );
  const [errors, setErrors] = React.useState({
    name: null,
    category: null,
    ingredients: null,
    instructions: null,
    prepTime: null,
    totalTime: null,
    serves: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = {
      name: null,
      category: null,
      ingredients: null,
      instructions: null,
      prepTime: null,
      totalTime: null,
      serves: null,
    };

    if (name.length === 0) {
      errors.name = "Recipe Name Cannot be Empty";
    }

    if (ingredients.length <= 3) {
      errors.ingredients = "Recipe ingredients must be more than 3 characters";
    }
    if (instructions.length <= 3) {
      errors.instructions =
        "Recipe instructions must be more than 3 characters";
    }

    if (!category || category === "all") {
      errors.category = "Recipe Category Must Not be Empty nor All";
    }
    if (!prepTime || prepTime === "-") {
      errors.prepTime = "Recipe Prep-Time Must Not be Empty";
    }
    if (!totalTime || totalTime === "-") {
      errors.totalTime = "Recipe Total-Time Must Not be Empty";
    }
    if (!serves || serves === "") {
      errors.serves = "Recipe Servings Must Not be Empty";
    }

    if (
      errors.name ||
      errors.ingredients ||
      errors.prepTime ||
      errors.totalTime ||
      errors.serves ||
      errors.instructions ||
      errors.category
    ) {
      setErrors(errors);
      return;
    }

    const recipe = {
      name: name,
      category: category,
      ingredients: ingredients,
      instructions: instructions,
      prepTime: prepTime,
      totalTime: totalTime,
      serves: serves,
    };

    if (existingRecipe) {
      recipe._id = existingRecipe._id;
      handleUpdateRecipe(recipe);
    } else {
      handleCreateRecipe(recipe);
    }
  }

  return (
    <div className="add-edit-recipe-form-container">
      <h1 className="add-edit-title">
        {existingRecipe ? "Edit Recipe" : "Create a New Recipe"}
      </h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <label className="name">
          Name<span className="required">*</span>:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "invalid" : ""}
          />
          {errors.name ? <span className="required">{errors.name}</span> : null}
        </label>

        <label className="category">
          Category<span className="required">*</span>:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? "invalid" : ""}
          >
            <option value=""></option>
            {categories.map((category) => {
              return (
                <option value={category.value} key={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
          {errors.category ? (
            <span className="required">{errors.category}</span>
          ) : null}
        </label>

        <label className="ingredients">
          Ingredients<span className="required">*</span>:
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={errors.ingredients ? "invalid" : ""}
          />
          {errors.ingredients ? (
            <span className="required">{errors.ingredients}</span>
          ) : null}
        </label>

        <label className="instructions">
          Instructions<span className="required">*</span>:
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={errors.instructions ? "invalid" : ""}
          />
          {errors.instructions ? (
            <span className="required">{errors.instructions}</span>
          ) : null}
        </label>

        <label className="prepTime">
          Prep-Time<span className="required">*</span>:
          <select
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className={errors.prepTime ? "invalid" : ""}
          >
            <option value=""></option>
            {prepTimeOptions.map((prepTimeOption) => {
              return (
                <option value={prepTimeOption.value} key={prepTimeOption.value}>
                  {prepTimeOption.label}
                </option>
              );
            })}
          </select>
          {errors.prepTime ? (
            <span className="required">{errors.prepTime}</span>
          ) : null}
        </label>

        <label className="totalTime">
          Total-Time<span className="required">*</span>:
          <select
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            className={errors.totalTime ? "invalid" : ""}
          >
            <option value=""></option>
            {totalTimeOptions.map((totalTimeOption) => {
              return (
                <option
                  value={totalTimeOption.value}
                  key={totalTimeOption.value}
                >
                  {totalTimeOption.label}
                </option>
              );
            })}
          </select>
          {errors.totalTime ? (
            <span className="required">{errors.totalTime}</span>
          ) : null}
        </label>

        <label className="serves">
          Serves<span className="required">*</span>:
          <select
            value={serves}
            onChange={(e) => setServes(e.target.value)}
            className={errors.serves ? "invalid" : ""}
          >
            <option value=""></option>
            {servesOptions.map((servesOption) => {
              return (
                <option value={servesOption.value} key={servesOption.value}>
                  {servesOption.label}
                </option>
              );
            })}
          </select>
          {errors.serves ? (
            <span className="required">{errors.serves}</span>
          ) : null}
        </label>
        <div className="button-container">
          <button type="button" onClick={handleCloseModal}>
            CLOSE
          </button>
          <button>{existingRecipe ? "SAVE & CLOSE" : "CREATE & CLOSE"}</button>
          {existingRecipe ? (
            <button
              type="button"
              onClick={() => handleDeleteRecipe(existingRecipe)}
            >
              DELETE
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default AddEditRecipeForm;
