import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

ReactDOM.render(
  <AlertProvider template={AlertTemplate}>
    <App />
  </AlertProvider>,
  document.getElementById("root")
);
registerServiceWorker();
