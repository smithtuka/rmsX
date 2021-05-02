import 'bootstrap/dist/css/bootstrap.css';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
const navBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    <img
                        src="http://galbern.com/wp-content/uploads/2018/11/logo1.png"
                        alt=""
                        width="30"
                        height="24"
                        className="d-inline-block align-top"
                    />
                    {/* RMS */}
                </Link>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/requisitions"
                        >
                            requisitions
                        </Link>
                        <Link className="nav-link" to="/projects">
                            projects
                        </Link>
                        <Link className="nav-link" to="/about">
                            Help
                        </Link>
                    </div>

                    <Link
                        className="navbar-brand"
                        to="/"
                        style={{ marginLeft: '900px', visibility: 'show' }} // not logged, hide this
                    >
                        <img
                            title={'logged' && 'user.name'}
                            src="https://embodiedfacilitator.com/wp-content/uploads/2018/05/human-icon-png-1901.png"
                            alt="logged in as "
                            width="38"
                            height="40"
                            className="d-inline-block align-top"
                        ></img>
                        <button
                            type="button"
                            className="btn btn-link "
                            onClick={() => {
                                sessionStorage.clear();
                                window.location.reload();
                            }}
                        >
                            logout
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default navBar;
