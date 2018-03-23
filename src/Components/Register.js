import React from 'react';
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faAt, faEnvelope, faKey } from '@fortawesome/fontawesome-free-solid'

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
        }
    }

    handleRegister(e) {
        e.preventDefault();

        axios.post('/register', {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }).then(function (response) {
            this.setState({
               name: response.data.name,
               username: response.data.username,
               email: response.data.email,
               password: response.data.password,
            });
        }.bind(this)).catch(function (error) {
            console.log(error)
        })
    }

    handleName(name) {
        this.setState({name: name.target.value});
    }

    handleUsername(username) {
        this.setState({username: username.target.value});
    }

    handleEmail(email) {
        this.setState({email: email.target.value});
    }

    handlePassword(password) {
        this.setState({password: password.target.value});
    }

    render() {

        return (
            <div>
                <h1>Register</h1>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-sm-6 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FontAwesomeIcon icon={faUser} /></div>
                                </div>
                                <input type="text" onChange={(e) => this.handleName(e)} className="form-control" id="inlineFormInputGroupUsername" placeholder="Full Name" />
                            </div>
                        </div>
                        <div className="col-sm-6 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FontAwesomeIcon icon={faAt} /></div>
                                </div>
                                <input type="text" onChange={(e) => this.handleUsername(e)} className="form-control" id="inlineFormInputGroupUsername" placeholder="Username" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row align-items-center">
                        <div className="col-sm-12 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></div>
                                </div>
                                <input type="email" onChange={(e) => this.handleEmail(e)} className="form-control" id="inlineFormInputGroupUsername" placeholder="Email Address" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row align-items-center">
                        <div className="col-sm-12 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputGroupUsername">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FontAwesomeIcon icon={faKey} /></div>
                                </div>
                                <input type="password" onChange={(e) => this.handlePassword(e)} className="form-control" id="inlineFormInputGroupUsername" placeholder="Password" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row align-items-center">
                        <div className="col-12 my-1">
                            <button onClick={this.handleRegister} className="btn btn-success btn-lg btn-block">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}