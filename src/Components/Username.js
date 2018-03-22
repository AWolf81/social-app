import React from 'react';
import axios from "axios/index";

export default class Username extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
        }
    }

    componentDidMount() {
        axios.get('/users/' + this.props.match.params.username).then(function (response) {
            this.setState({
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
            })
        }.bind(this));
    }

    render() {
        return (
            <div>
                <p>{this.props.match.params.username}</p>
                <p>Name: {this.state.name}</p>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        )
    }
}