import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { createSelector } from "reselect";
import { RestrictionRoute as ProtectedRoute } from "react-redux-restriction";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ConnectedRouter } from "react-router-redux";

import Nav from "./Components/Nav";
import Home from "./Components/Home";
// import Username from "./Components/Username";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
// import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";

import history from "./history";
// import auth from "./Services/Auth";

// axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");
const selectIsLoggedIn = createSelector(
  state => state.localAuth,
  user => !!user.isLoggedIn
);

const Routes = match => {
  return (
    // <Router>
    // <Switch>
    <ConnectedRouter history={history}>
      {/* ConnectedRouter will use the store from Provider automatically */}
      <div>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute
              exact
              path="/profile/:username"
              match={match}
              component={Profile}
              data={selectIsLoggedIn}
            />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute
              path="/user/:username"
              match={match}
              component={Profile}
              data={selectIsLoggedIn}
            />

            <ProtectedRoute
              path="/(user|profile)"
              data={!selectIsLoggedIn}
              render={() => <Redirect to="/" />}
            />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
    // </Router>
  );
};

export default Routes;
