import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { localAuthSvc } from "../Services/LocalAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log("prot route render");
  const ConnectedRoute = connect(state => {
    return {
      isLoggedIn: state.localAuth.isLoggedIn
    };
  })(Route);

  return (
    <ConnectedRoute
      {...rest}
      render={props =>
        props.isLoggedIn ? (
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

export default ProtectedRoute;
