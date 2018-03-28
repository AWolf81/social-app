import axios from "axios";

class AuthService {
  token = localStorage.getItem("token");
  user = undefined;

  getUser() {
    return !this.user && localStorage.getItem("token")
      ? axios.get("/auth/login").then(response => {
          console.log("auth/login response", response);
          const { user } = response.data;
          this.user = user;
          return {
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email
          };
        })
      : this.user;
  }
  setToken(token) {
    localStorage.setItem("token", token);
    this.token = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  register(newUser) {
    // post user to server
    return axios
      .post("/register", newUser, {
        contentType: "application/json"
      })
      .then(response => {
        this.setToken(response.headers.authorization); // Laravel passing token as header here
        // console.log("response in register", response);
        // return response.data; // no data returned from Laravel - just created
        return response.statusText;
      });
  }

  login(email, password) {
    return axios
      .post("/auth", {
        email,
        password
      })
      .then(response => {
        const { token } = response.data;
        // console.log("get user info", response.data, token);
        this.setToken(token);
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.user = undefined;
    this.token = undefined;
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null; // todo check also expiry date of token
  }
}

export default new AuthService();
