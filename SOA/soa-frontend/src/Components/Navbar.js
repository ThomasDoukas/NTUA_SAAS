import React, { useContext } from 'react';
import AuthContext from '../source/auth-context';

const NavBar = (props) => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#06eeaa" }}>
            <a className="navbar-brand" href="/" style={{ color: "#343a40", }}> AskMeAnything </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto" />
                <div className="navbar-nav">
                    {!isLoggedIn && <a className="nav-item nav-link active" href="/auth" style={{ color: "#343a40"}}> Login </a>}
                    {isLoggedIn && <a className="nav-item nav-link active" href="/myprofile" type='button' style={{ color: "#343a40", }}> MyProfile </a>}
                    {isLoggedIn && <a className="nav-item nav-link active" href="#!" onClick={logoutHandler} type='button' style={{ color: "#343a40", cursor: "pointer"}}> Logout </a>}
                </div>
            </div>
        </nav>
    );

};

export default NavBar;