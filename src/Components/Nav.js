import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            token: false,
            username: '',
            password: ''
        }
    }

    handleLogin(e) {
        e.preventDefault();
        axios.post('/auth', {
            email: this.state.email,
            password: this.state.password,
        }).then(function (response) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.setState({token: true})
        }.bind(this)).catch(function (error) {
            console.log(error)
        });
    }

    handleEmail(email) {
        this.setState({email: email.target.value});
    }

    handlePassword(password) {
        this.setState({password: password.target.value})
    }

    handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({token: false})
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                    </ul>
                    {localStorage.length === 0 && this.state.token === false ? (
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-1" type="email" placeholder="Email" onChange={(e) => this.handleEmail(e)} aria-label="Email" />
                            <input className="form-control mr-sm-1" type="password" placeholder="Password" onChange={(e) => this.handlePassword(e)} aria-label="Password" />
                            <button className="btn btn-success btn-sm my-1 my-sm-0" onClick={this.handleLogin}>Login</button>&nbsp;
                            <Link className="btn btn-primary btn-sm my-1 my-sm-0" to="/register">Register</Link>
                        </form>
                    ) : (
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-sm btn-success my-1 my-sm-0" onClick={this.handleLogout}>Logout</button>
                        </form>
                    )}
                </div>
            </nav>
        )
    }
}

