import React from "react";
import { withRouter } from "react-router-dom";
import auth from "../Services/Auth";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: "",
      username: "",
      email: "",
      userId: null // used later for creating comments etc.
    };
  }

  componentDidMount() {
    // console.log("mounted profile");
    auth.getUser().then(user => {
      // console.log("loaded user", user);

      this.setState({
        loading: false,
        ...user
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Profile</h1>
          <p>Name: {this.state.name}</p>
          <p>Username: {this.state.username}</p>
          <p>Email: {this.state.email}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
