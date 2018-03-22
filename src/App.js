import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Components/Nav';
import Home from './Components/Home';
import Username from './Components/Username';
import Users from './Components/Users';

axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const Routes = (match) => (
    <Router>
        <div>
            <Nav/>

            <div className="container">
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route path="/user/:username" match={match} component={Username} />
            </div>
        </div>
    </Router>
);

export default Routes;
