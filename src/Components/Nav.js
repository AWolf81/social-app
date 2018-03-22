import React from "react";
import axios from 'axios';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin(e) {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_ADDRESS + '/auth', {
            email: this.state.email,
            password: this.state.password,
        }).then(function (response) {
            const token = response.data.token;
            localStorage.setItem('token', token);
        }).catch(function (error) {
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
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/users">Users</a>
                        </li>
                    </ul>
                    {localStorage.length === 0 ? (
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-1" type="email" placeholder="Email" onChange={(e) => this.handleEmail(e)} aria-label="Email" />
                            <input className="form-control mr-sm-1" type="password" placeholder="Password" onChange={(e) => this.handlePassword(e)} aria-label="Password" />
                            <button className="btn btn-success my-1 my-sm-0" onClick={this.handleLogin}>Login</button>&nbsp;
                            <button className="btn btn-primary my-1 my-sm-0" >Register</button>
                        </form>
                    ) : (
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-success my-1 my-sm-0" onClick={this.handleLogout}>Logout</button>
                        </form>
                    )}
                </div>
            </nav>
        )
    }
}

