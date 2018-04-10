// import localAuthSvc from "../Services/LocalAuth";

export default (state = { user: undefined, isLoggedIn: false }, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        user: undefined,
        isLoggedIn: false
      };
    case "USER_RECEIVED":
      return {
        ...state,
        user: action.user
      };
    case "USER_REGISTERED":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
