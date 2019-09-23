import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PopUp from './Popup';



export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Link to="/table" >
                    <PopUp />
                </Link>
            </div>
        )
    }
}


