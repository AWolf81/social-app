import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Username from "./Components/Username";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";

// import auth from "./Services/Auth";

axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

const Routes = match => {
  return (
    <Router>
      <div>
        <Nav />

        <div className="container">
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/users" component={Users} />

          <Route exact path="/register" component={Register} />
          <Route path="/user/:username" match={match} component={Username} />
        </div>
      </div>
    </Router>
  );
};

export default Routes;
