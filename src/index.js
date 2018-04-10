import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import authReducer from "./reducers/auth";
import notificationReducer from "./reducers/notification";
import io from "socket.io-client";
import { reducer as reduxIo } from "redux.io";

import history from "./history";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Logger with default options
import logger from "redux-logger";
import "./index.css";
import "react-progress-2/main.css";
// import AuthService from "react-auth-flow"; // will check it later --> for now create from scratch

import "./config/axios";

const socket = reduxIo(io);
const routerMiddle = routerMiddleware(history);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middleware = [thunk, routerMiddle, logger];
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const reducers = combineReducers({
  localAuth: authReducer,
  notification: notificationReducer,
  router: routerReducer,
  socket
});

const store = createStore(reducers, enhancer);

// let authReducer = AuthService.init({
//   store: store,
//   loginPath: "/",
//   defaultRedirectPath: "/profile",
//   redirectAction: push,
//   localStorageKey: "token"
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
