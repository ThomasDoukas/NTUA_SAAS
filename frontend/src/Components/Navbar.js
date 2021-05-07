import React, { Component } from 'react';
//import './Navbar.css';

const check1 = false;

function handleClick(e) {
    e.preventDefault();
    check1 = true;
}

class NavBar extends React.Component {
    render() {
      if (this.props.loggedin) {
        return (
          <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#06EEAA"}}>
              <a class="navbar-brand" exact href="/"> AskMeAnything </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/"> Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link active" href="/myprofile"> MyProfile </a>
                    <a class="nav-item nav-link active" href="/"> Log Out </a>
                  </div>
                </div>
          </nav>
      )
      } else {
          return (
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#06EEAA"}}>
              <a class="navbar-brand" exact href="/"> AskMeAnything </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/"> Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link active" href="/signin"> Sign In </a>
                    <a class="nav-item nav-link active" href="/login"> Log In </a>
                  </div>
                </div>
          </nav>
        )
      }
        
    }
}

export default NavBar;