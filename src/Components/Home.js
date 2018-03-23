import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            name: '',
            username: '',
            email: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            axios.get('/auth/login').then(function (response) {
                this.setState({
                    loading: false,
                    name: response.data.user.name,
                    username: response.data.user.username,
                    email: response.data.user.email,
                })
            }.bind(this));
        }
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
        )
    }
};