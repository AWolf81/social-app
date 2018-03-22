import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Components/Nav';
import Home from './Components/Home';
import Username from './Components/Username'

const Routes = (match) => (
    <Router>
        <div>
            <Nav/>

            <div className="container">
                <Route exact path="/" component={Home} />
                <Route path="/:username" match={match} component={Username} />
            </div>
        </div>
    </Router>
);

export default Routes;
