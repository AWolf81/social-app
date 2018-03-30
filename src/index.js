import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import localAuthSvc from "./Services/LocalAuth";
import authReducer from "./reducers/auth";
import history from "./history";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Logger with default options
import logger from "redux-logger";
// import AuthService from "react-auth-flow"; // will check it later --> for now create from scratch

import "./config/axios";

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
  router: routerReducer
});

const store = createStore(reducers, enhancer);

const action = localAuthSvc.fetchUser();

if (action) {
  store.dispatch(action);
}

// let authReducer = AuthService.init({
//   store: store,
//   loginPath: "/",
//   defaultRedirectPath: "/profile",
//   redirectAction: push,
//   localStorageKey: "token"
// });

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
