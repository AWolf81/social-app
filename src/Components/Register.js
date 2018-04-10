import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import localAuthSvc from "../Services/LocalAuth";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faEnvelope,
  faKey
} from "@fortawesome/fontawesome-free-solid";

class Register extends React.Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: ""
  };

  handleRegister = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.dispatch(localAuthSvc.register(newUser));
    // auth
    //   .register(newUser)
    //   .then(({ errors, success }) => {
    //     console.log("registered", errors, success);

    //     if (success) {
    //       this.props.alert.success("Successfully registerd!", {
    //         timeout: 2000, // custom timeout just for this one alert
    //         //onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
    //         onClose: () => {
    //           // callback that will be executed after this alert is removed);
    //           // redirect to home
    //           this.props.history.push("/profile");
    //         }
    //       });
    //     } else if (errors) {
    //       for (let [, errorText] of Object.entries(errors)) {
    //         // later highlight field in form
    //         this.props.alert.error(`Sign-up failed! ${errorText}`);
    //       }
    //     }
    //     // this.setState({
    //     //   name: user.name,
    //     //   username: user.username,
    //     //   email: user.email,
    //     //   password: user.password
    //     // });
    //   })
    //   .catch(function(error) {
    //     // @todo: show flash message with error
    //     // errors:
    //     // - server not available
    //     // - already registered
    //     console.log(error);
    //   });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form>
          <div className="form-row align-items-center">
            <div className="col-sm-6 my-1">
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                Username
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
                <input
                  type="text"
                  onChange={this.handleName}
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="col-sm-6 my-1">
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                Username
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faAt} />
                  </div>
                </div>
                <input
                  type="text"
                  onChange={this.handleUsername}
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>

          <div className="form-row align-items-center">
            <div className="col-sm-12 my-1">
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                Email
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </div>
                <input
                  type="email"
                  onChange={this.handleEmail}
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Email Address"
                />
              </div>
            </div>
          </div>

          <div className="form-row align-items-center">
            <div className="col-sm-12 my-1">
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                Email
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faKey} />
                  </div>
                </div>
                <input
                  type="password"
                  onChange={e => this.handlePassword(e)}
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="form-row align-items-center">
            <div className="col-12 my-1">
              <button
                onClick={this.handleRegister}
                className="btn btn-success btn-lg btn-block"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ ...state }))(
  withRouter(Register)
);
