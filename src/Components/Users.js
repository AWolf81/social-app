import React from "react";
import { Link } from "react-router-dom";
import axios from "axios/index";

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.users = axios.get("/users").then(response => {
      this.setState({
        users: response.data.users
      });
    });
  }

  render() {
    return (
      <div>
        <h1>User</h1>
        <div className="list-group">
          {this.state.users.map(user => (
            <div key={user.id} className="list-group-item">
              <p>{user.name}</p>
              <Link to={`/user/${user.username}`}>View Profile</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
