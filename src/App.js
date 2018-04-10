import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createSelector } from "reselect";
import { RestrictionRoute as ProtectedRoute } from "react-redux-restriction";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Notification from "./Components/Notification";

import history from "./history";
import localAuthSvc from "./Services/LocalAuth";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const action = localAuthSvc.getUser();

    if (action.user) {
      dispatch(action);
      dispatch(localAuthSvc.loggedInAction());
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { alert, visible, message, messageType, timeout } = nextProps;
  //   if (visible) {
  //     alert.show(message, { timeout });
  //   } else {
  //     alert.remove(alert);
  //   }
  //   console.log("new props in app", visible, alert);
  //   return null; // no state change required
  // }

  render() {
    const selectIsLoggedIn = createSelector(
      state => state.localAuth,
      localAuth => !!localAuth.isLoggedIn
    );

    const { match } = this.props;

    // if (visible) {
    //   console.log("show message", visible, alert);

    // } else {
    //   // alert.remove(alert);
    // }

    return (
      <ConnectedRouter history={history}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <div>
          <Nav />
          <Notification />
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
  }
}

function mapStateToProps(state) {
  return {
    ...state.notification
  };
}

export default connect(mapStateToProps)(App);
