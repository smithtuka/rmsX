import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
const navBar = () => {
    return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
            <img src="http://galbern.com/wp-content/uploads/2018/11/logo1.png" alt="" width="30" height="24" className="d-inline-block align-top" />
            RMS
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/requisitions">requisitions</Link>
            <Link className="nav-link" to="/projects">projects</Link>
            <Link className="nav-link" to="/about">about</Link>
        </div>
      </div>
    </div>
  </nav>);
}
 
export default navBar;