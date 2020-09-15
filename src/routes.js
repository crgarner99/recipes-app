import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Search from "./containers/Search";
import RecipeBook from "./containers/RecipeBook";
import RecentlyDeleted from "./containers/RecentlyDeleted";
import NavBar from "./components/NavBar";

const routes = (
  <Router>
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>

    <Route path="/Home" component={Home} />
    <Route path="/Search" component={Search} />
    <Route path="/RecipeBook" component={RecipeBook} />
    <Route path="/RecentlyDeleted" component={RecentlyDeleted} />
  </Router>
);

export default routes;
