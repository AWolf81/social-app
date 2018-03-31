import React from "react";
import LoadingBar from "react-redux-loading-bar";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { createSelector } from "reselect";
import { RestrictionRoute as ProtectedRoute } from "react-redux-restriction";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import Register from "./Components/Register";

import history from "./history";

const selectIsLoggedIn = createSelector(
  state => state.localAuth,
  localAuth => !!localAuth.isLoggedIn
);

const Routes = match => {
  return (
    <ConnectedRouter history={history}>
      {/* ConnectedRouter will use the store from Provider automatically */}
      <div>
        <LoadingBar />
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />

            {/* <ProtectedRoute
            path="/(users|profile|user)"
            not
            data={selectIsLoggedIn}
            render={() => <Redirect to="/" />}
          /> */}
            <ProtectedRoute
              exact
              path="/profile/:username"
              match={match}
              component={Profile}
              data={selectIsLoggedIn}
            />
            <ProtectedRoute
              exact
              path="/users"
              component={Users}
              data={selectIsLoggedIn}
            />
            <ProtectedRoute
              path="/user/:username"
              match={match}
              component={Profile}
              data={selectIsLoggedIn}
            />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  );
};

export default Routes;
