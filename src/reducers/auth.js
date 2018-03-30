// import localAuthSvc from "../Services/LocalAuth";

export default (state = { user: undefined, isLoggedIn: false }, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      };
    case "LOGOUT":
      return {
        ...state,
        ...action.payload
      };
    case "USER_RECEIVED":
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case "REGISTER_RESULT":
      // todo add notifications here
      return {
        ...state,
        registerResult: action.registerResult
      };
    default:
      return state;
  }
};
