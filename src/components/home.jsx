import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RMS extends Component {
    state = {};
    render() {
        return (
            <div>
                {/* <RegistrationForm></RegistrationForm> */}

                <hr />
                <Link className="navbar-brand" to="/home">
                    <h3>Requisition Management System</h3>
                </Link>

                <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/requisitions"
                >
                    Requisitions
                </Link>
                <Link className="nav-link" to="/projects">
                    Projects
                </Link>
                <Link className="nav-link" to="/about">
                    Help
                </Link>

                <span>
                    {' '}
                    coming up...
                    <br />
                    DASHBOARDS / GRAPHS{' '}
                </span>

                <br></br>
            </div>
        );
    }
}

export default RMS;
