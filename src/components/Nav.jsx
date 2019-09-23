import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                {/*<img src="assets/interspatial-logo.png" alt=""/> */}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/table">Add Data</Link></li>
                </ul>
            </div>       
        )
    }
}
