import React, { Component } from 'react';
import LoginForm from './loginForm';
// import LoginForm from '../../vidly/src/components/loginForm';
class RMS extends Component {
    state = {};
    render() {
        return (
            <div>
                <h2>//RmsX</h2>
                <hr />
                <p> a good accordians showing a Summary of content</p>
                <p> DASHBOARDS // graphs EVENTUALLY</p>
                <span>
                    {' '}
                    may have Projects {'=>'} Stages {'=>'} Requisitions{' '}
                </span>
                <br></br>
            </div>
        );
    }
}

export default RMS;
