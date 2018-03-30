import React from "react";
import { withRouter } from "react-router-dom";
import StatusList from "./Status/StatusList";
import axios from "axios";

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

  setUser = user => {
    this.setState({
      loading: false,
      ...user
    });
  };

  componentDidMount() {
    // console.log("mounted profile");
    const { username } = this.props.match.params;

    console.log("profile will mount", username, this.props.match.params);

    // if (username) {
    this.loadUser(username);
    // } else {
    // auth.fetchUser().then(user => {
    //   // console.log("loaded user", user);
    //   setUser(user);
    // });
    // }
  }

  // getDerivedStateFromProps(props) {
  //   console.log("derived prop", props.match.params);
  //   // this.loadUser(props.match.params.username);
  //   return null; // null means no state modifications
  // }

  loadUser(username) {
    console.log("load profile for user:", username);
    axios.get(`/users/${username}`).then(response => {
      const { user } = response.data;
      console.log("response", user);
      this.setUser(user);
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
        <div className="col-12">
          <StatusList username={this.props.match.params.username} />
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
