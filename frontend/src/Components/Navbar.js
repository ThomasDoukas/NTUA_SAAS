import React, { useState, useContext } from 'react';
import classes from './Navbar.module.css';
import AuthContext from '../source/auth-context';
import AuthForm from './Auth/AuthForm';

const check1 = false;

function handleClick(e) {
    e.preventDefault();
    check1 = true;
}

const NavBar = (props) => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#06EEAA" }}>
            <a class="navbar-brand" exact href="/" style={{ color: "#343a40", }}> AskMeAnything </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" />
                <div class="navbar-nav">
                    {!isLoggedIn && <a class="nav-item nav-link active" href="/auth" style={{ color: "#343a40"}}> Login </a>}
                    {isLoggedIn && <a class="nav-item nav-link active" onClick={logoutHandler} style={{ color: "#343a40", }}> Logout </a>}
                </div>
            </div>
        </nav>
    );

};

export default NavBar;