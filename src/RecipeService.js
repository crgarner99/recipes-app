import axios from "axios";

//const BASE_URL = "http://localhost:3005";
const BASE_URL = "https://recipe-app-cameron.herokuapp.com";
//TODO connect to hosting platform
// const BASE_URL = "URL of Hosting Platform";

const getRecipes = () => {
  return axios.get(`${BASE_URL}/api/recipes`);
};

const getRecipe = (recipeId) => {
  return axios.get(`${BASE_URL}/api/recipes/${recipeId}`);
};

const createRecipe = (recipe) => {
  return axios.post(`${BASE_URL}/api/recipes`, recipe);
};

const updateRecipe = (recipeId, recipe) => {
  return axios.put(`${BASE_URL}/api/recipes/${recipeId}`, recipe);
};

const deleteRecipe = (recipeId) => {
  return axios.delete(`${BASE_URL}/api/recipes/${recipeId}`);
};

export { getRecipe, getRecipes, deleteRecipe, updateRecipe, createRecipe };
