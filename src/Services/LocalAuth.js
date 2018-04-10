import axios from "axios";
// import { Container } from "unstated";
// import AuthService from 'react-auth-flow';
import { push } from "react-router-redux";
import { setAuthHeader } from "../config/axios";
import jwtDecode from "jwt-decode";
import { SHOW_NOTIFY_ACTION } from "../actions/notification";

class LocalAuthService {
  getUser() {
    const token = localStorage.getItem("token");
    if (token) {
      const { user } = jwtDecode(token);
      console.log("decoding user", this, user, jwtDecode(token));
      // return async dispatch => {
      //   const response = await axios.get("/auth/login");
      //   const { user } = response.data;
      //   dispatch(this.userFetchedAction(user));
      //   // dispatch(push(`/profile/${user.username}`)); // don't change location bc. reload would also change location
      // };

      return this.userReceivedAction(user);
    }

    return this.userReceivedAction();
  }

  userReceivedAction(user) {
    return {
      type: "USER_RECEIVED",
      user
    };
  }

  setToken(token) {
    try {
      // console.log("Set token", token);
      localStorage.setItem("token", token);
      setAuthHeader(localStorage.getItem("token"));
    } catch (err) {
      // ignore
    }
  }

  register(newUser) {
    // post user to server
    return async (dispatch, getState) => {
      try {
        const response = await axios.post("/register", newUser, {
          contentType: "application/json"
        });
        const token = response.headers.authorization;

        if (token) {
          this.setToken(token); // Laravel passing token as header here

          dispatch(this.getUser());
          dispatch(this.loggedInAction());

          const { user } = getState().localAuth;

          // success message
          dispatch(
            SHOW_NOTIFY_ACTION("Successfully registered!", {
              messageType: "success"
            })
          );
          // redirect after 1 seconds // success message disapears after 2 seconds
          setTimeout(() => dispatch(push(`/profile/${user.username}`)), 1000);
        } else {
          // user or email already registered
          console.log("register error", response.data);
          const error = response.data;
          for (let key in error) {
            dispatch(
              SHOW_NOTIFY_ACTION(`Error! ${error[key][0]}`, {
                messageType: "danger"
              })
            );
          }
        }
      } catch (response) {
        console.log(response);
        dispatch(SHOW_NOTIFY_ACTION("Error!", { messageType: "danger" }));
      }
    };
  }

  /*
  * Asynch Login action checks credentials
  */
  login(email, password) {
    // <<<<<<<<<< check error handling
    return async (dispatch, getState) => {
      console.log("request login", email, password);
      try {
        const response = await axios.post("/auth", {
          email,
          password
        });
        const { token } = response.data;
        console.log("get user info", response, token);
        this.setToken(token);

        dispatch(this.getUser());
        dispatch(this.loggedInAction());

        const { user } = getState().localAuth;

        dispatch(push(`/profile/${user.username}`));
      } catch ({ response: { data: { error } } }) {
        console.log("error", error);
        if (error === "invalid_credentials") {
          dispatch(
            SHOW_NOTIFY_ACTION("Email or password incorrect!", {
              messageType: "danger"
            })
          );
        } else {
          // what errors could occur e.g. server not responding/not reacable, user offline ...
          console.log("error occured during login", error);
          dispatch(
            SHOW_NOTIFY_ACTION("Network error!", { messageType: "danger" })
          );
        }
      }
    };
  }

  loggedInAction(user) {
    return {
      type: "LOGGED_IN",
      isLoggedIn: true
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
      type: "LOGOUT"
    };
  }
  // isAuthenticated(isLoggedIn, token) {
  //   return isLoggedIn; //localStorage.getItem("token") !== null; // todo check also expiry date of token
  // }
}

export default new LocalAuthService();
