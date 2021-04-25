import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import PropTypes from 'prop-types';
export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // see useEffect

    async function loginUser(credentials) {}

// axios

return  await axios.post('https://rms-a.herokuapp.com/api/public/v1/login', credentials)
    // return  await axios.post('http://localhost:8080/api/public/v1/login', credentials)
    .then(res => {
    localStorage.setItem("authorization", res.data);
    return res.data;
  });
       }

    //  function  createBasicAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }


       const handleSubmit = async e => {
        e.preventDefault();
        console.log("------- submitting -------");
        const token = await loginUser({
          username,
          password
        });
        console.log(token);
        setToken(token);
        // alert(token);
      }

    return(
      <div className="login-wrapper">
        <h2>log in</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" className="form-control" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" className="form-control m-2" onChange={e => setPassword(e.target.value)}/>
          
          </label>
          <div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }