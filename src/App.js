import './App.css';
import './css/login.css';
import React, { useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from './components/logIn';
import RMS from './components/home';
import NavBar from './components/navbar';
import Footer from './components/common/footer';
import Requisitions from './components/requisitions';
import Project from './components/project';
import About from './components/about';
import NotFound from './components/notFound';
import RequisitionForm from './components/requisitionForm';
import './components/interceptor';
// import { login } from '.css/login';

 function setToken (userToken) {
    console.log("token" +  `Bearer ${userToken}`);
    localStorage.setItem("token", `Bearer ${userToken}`);
}

function getToken() {
    return localStorage.getItem('token');
}

function App() {
    const token = getToken();

    if(!token) {
      return <Login setToken={setToken} />
    } else
    return (
        <main className="main">
            <NavBar />
            <Switch>
                <Route path="/home" component={RMS} key={'home'} />
                <Route
                    path="/requisitions/:id"
                    component={RequisitionForm}
                    key={'req_id'}
                />
                <Route
                    path="/requisitions"
                    component={Requisitions}
                    key={'requisitions'}
                />
                <Route path="/projects" component={Project} key={'project'} />
                <Route path="/about" component={About} key={'about'} />
                <Route path="/login" component={Login} key={'login'} />
                <Route
                    path="/not-found"
                    component={NotFound}
                    key={'not-found'}
                />
                <Redirect from="/" exact to="/home" />
            </Switch>
            <Footer />
        </main>
    );
}

export default App;
