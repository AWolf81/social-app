import axios from "axios";
// import { Container } from "unstated";
// import AuthService from 'react-auth-flow';
import { push } from "react-router-redux";
import { setAuthHeader } from "../config/axios";

class LocalAuthService {
  fetchUser() {
    if (localStorage.getItem("token")) {
      console.log("fetching user", this);
      return async dispatch => {
        const response = await axios.get("/auth/login");
        const { user } = response.data;
        dispatch(this.userFetchedAction(user));
        dispatch(push(`/profile/${user.username}`));
      };
    }
    return null;
  }

  userFetchedAction(user) {
    return {
      type: "USER_RECEIVED",
      user
    };
  }

  setToken(token) {
    try {
      console.log("Set token", token);
      localStorage.setItem("token", token);
      setAuthHeader(localStorage.getItem("token"));
    } catch (err) {
      // ignore
    }
  }

  register(newUser) {
    // post user to server
    return async dispatch => {
      const response = await axios.post("/register", newUser, {
        contentType: "application/json"
      });

      console.log("register data", response);
      let errors, success;
      if (response.data) {
        // error present
        errors = response.data;
      } else {
        this.setToken(response.headers.authorization); // Laravel passing token as header here
        success = true;
      }
      const { user } = response.data;
      // console.log("response in register", response);
      // return response.data; // no data returned from Laravel - just created
      dispatch(
        this.userRegisteredAction({
          success,
          errors
        })
      );
      dispatch(push(`/profile/${user.username}`));
    };
  }

  userRegisteredAction(result) {
    return {
      type: "USER_REGISTERED",
      registerResult: result
    };
  }

  loginRequest(email, password) {
    return async dispatch => {
      console.log("request login", email, password);
      const response = await axios.post("/auth", {
        email,
        password
      });

      const { token, user } = response.data;
      console.log("get user info", response, token);
      this.setToken(token);

      dispatch(this.loggedInAction(user));

      dispatch(push(`/profile/${user.username}`));
    };
  }

  loggedInAction(user) {
    return {
      type: "LOGGED_IN",
      user
    };
  }

  logout() {
    return async dispatch => {
      localStorage.removeItem("token");
      dispatch(this.loggingOut());
      dispatch(push("/"));
    };
  }

  loggingOut() {
    return {
      type: "LOGOUT",
      payload: {
        user: undefined,
        isLoggedIn: false
      }
    };
  }
  // isAuthenticated(isLoggedIn, token) {
  //   return isLoggedIn; //localStorage.getItem("token") !== null; // todo check also expiry date of token
  // }
}

export default new LocalAuthService();
