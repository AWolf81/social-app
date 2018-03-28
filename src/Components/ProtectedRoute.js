import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../Services/Auth";

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
