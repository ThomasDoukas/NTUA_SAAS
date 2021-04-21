import React, { Component } from 'react';
import './Navbar.css';

const check1 = false;

function handleClick(e) {
    e.preventDefault();
    check1 = true;
}

class NavBar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-light">
                <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <a class="navbar-brand">AskMeAnything.</a>
                <li class="nav-item active">
                  <a class="nav-link" exact href="/"> Home </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" exact href="/signin"> Sign In</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" exact href="/login"> Log In </a>
                </li>
              </ul>
            </div>
          </nav>
        )
    }
}

export default NavBar;

//<Nav.Link exact href="/myprofile">My Profile</Nav.Link>

/*<Navbar bg="dark" variant="dark">
                    <NavbarBrand exact href="/">Home</NavbarBrand>
                    <Nav className="mr-auto">
                        <NavLink exact href="/signin">Sign In </NavLink>
                        <NavLink exact href="/login">Log In </NavLink>
                        <NavLink exact href="/ask">Ask a Question </NavLink>
                        <NavLink exact href="/answer">Answer a Question </NavLink>
                        <NavLink exact href="/byperiod">Questions by Period </NavLink>
                        <NavLink exact href="/bykeyword">Questions by Keyword </NavLink>
                    </Nav>
                </Navbar>*/