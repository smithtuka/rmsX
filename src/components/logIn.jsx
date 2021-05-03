import React, { useState, useEffect } from 'react';
import '../css/login.css';
import axios from 'axios';
import PropTypes from 'prop-types';
export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();
    const [count, setCount] = useState(0);

    async function loginUser(credentials) {
        // axios

        return await axios
            .post(
                'https://rms-a.herokuapp.com/api/public/v1/login',
                credentials
            )
            // return await axios
            //     .post('http://localhost:8080/api/public/v1/login', credentials)
            .then((res) => {
                sessionStorage.setItem('token', res.data);
                return res.data;
            })
            .catch((err) => {
                alert('log in failed. try again');
                window.location.reload();
            });
    }

    useEffect(() => {
        const fetchUser = async () => {
            return await axios
                .get(`https://rms-a.herokuapp.com/users/v1/${username}`)
                // .get(`http://localhost:8080/users/v1/${username}`)
                .then((res) => {
                    setUser(JSON.stringify(res.data));
                    sessionStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('user', JSON.stringify(res.data));
                    console.log(JSON.stringify(res.data));
                    // window.location.reload();
                    return res.data;
                })
                .catch((err) => {
                    alert('log in failed. try again');
                    localStorage.clear();
                    sessionStorage.clear();
                });
        };
        if (count != 0) {
            fetchUser();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, [count]);

    let token = '';
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('------- submitting -------');
        token = await loginUser({
            username,
            password
        });
        console.log(token);
        setToken(token);
        setCount(1);
        // window.location.reload();
        // setCount(1);
    };

    return (
        <div className="login-wrapper">
            <h2>log in</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        className="form-control m-2"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
