import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
