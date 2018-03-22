import React from 'react';
import axios from "axios/index";

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.users = axios.get('/users').then(function (response) {
            this.setState({
                users: response.data.users
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <h1>User</h1>
                {this.state.users.map((user) => {
                    const profileLink = '/user/' + user.username;
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p>
                            <a href={profileLink}>View Profile</a>
                        </div>
                    )
                }

                )}
            </div>
        )
    }
}