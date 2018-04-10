import React from "react";
import { Link } from "react-router-dom";
// import { withAlert } from "react-alert";
import localAuthSvc from "../Services/LocalAuth";
import { connect } from "react-redux";
import Progress from "react-progress-2";

class Nav extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleLogin = e => {
    e.preventDefault();
    console.log("handle login", this.state);
    this.props.dispatch(
      localAuthSvc.login(this.state.email, this.state.password)
    );
  };
  // handleLogin = e => {
  //   e.preventDefault();
  //   auth
  //     .login(this.state.email, this.state.password)
  //     .then(response => {
  //       const { username } = response.data.user;
  //       // auth success --> redirect to home
  //       this.props.history.push(`/profile/${username}`);
  //     })
  //     .catch(({ response }) => {
  //       // login failed --> show password or username incorrect
  //       console.log("error", response);
  //       if (response.data.error === "invalid_credentials") {
  //         this.props.alert.error("Email or Password incorrect!", {
  //           timeout: 2000
  //         });
  //       }
  //     });
  // };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.dispatch(localAuthSvc.logout());
    // this.props.history.push("/");
  };

  render() {
    // const authenticated = auth.isAuthenticated();
    // const { user } = this.props;

    const { isLoggedIn: loggedIn } = this.props;

    console.log("render nav", loggedIn);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Progress.Component />
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {loggedIn /*protected links - only for auth. users*/ ? (
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            ) : null}
          </ul>
          {!loggedIn ? (
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-1"
                type="email"
                placeholder="Email"
                onChange={this.handleEmail}
                aria-label="Email"
              />
              <input
                className="form-control mr-sm-1"
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
                aria-label="Password"
              />
              <button
                className="btn btn-success btn-sm my-1 my-sm-0"
                onClick={this.handleLogin}
              >
                Login
              </button>&nbsp;
              <Link
                className="btn btn-primary btn-sm my-1 my-sm-0"
                to="/register"
              >
                Register
              </Link>
            </form>
          ) : (
            <div>
              <span>
                Welcome,
                {this.props.user && this.props.user.username}!
              </span>
              <form className="form-inline my-2 my-lg-0">
                <button
                  className="btn btn-sm btn-success my-1 my-sm-0"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.localAuth
  };
}

export default connect(mapStateToProps)(Nav);
