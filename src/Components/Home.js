import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
        }
    }

    render() {
        const self = this;
        axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        axios.get('/auth/login').then(function (response) {
            self.setState({
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
            })
        });

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