import React, { Component } from 'react';
//import './SignIn.css';
import { Jumbotron, Col, Image, Container, Row } from 'react-bootstrap';

class SignIn extends React.Component {

    state = {
        email: undefined,
        password: undefined,
        password2: undefined,
        birthday: undefined,
        username: undefined,
        firstname: undefined,
        lastname: undefined
    }
    
    signinFunc = async (e) => {
        if (e) e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const birthday = e.target.elements.birthday.value;
        const username = e.target.elements.username.value;
        const firstname = e.target.elements.firstname.value;
        const lastname = e.target.elements.lastname.value;
        const password2 = e.target.elements.password2.value;
        const api_call = await fetch('http://localhost:3000/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        firstName: firstname,
                        lastName: lastname,
                        username: username,
                        birthday: birthday
                    })
                });
                if (api_call.ok) {
                    const data = await api_call.json();
                    console.log(data);
                }
    }

    render() {
        return (
            <form onSubmit={this.signinFunc}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label> Email address </label>
                    <input type="email" className="form-control" placeholder="ex. wena@indlovu.gr" name='email' />
                </div>
                <div className="form-group">
                    <label> Password </label>
                    <input type="password" className="form-control" placeholder="Enter password..." name='password' />
                </div>
                <div className="form-group">
                    <label> Password Repeat </label>
                    <input type="password" className="form-control" placeholder="Re-enter password..." name='password2' />
                </div>
                <div className="form-group">
                    <label> First Name </label>
                    <input type="username" className="form-control" name='firstname' />
                </div>
                <div className="form-group">
                    <label> Last Name </label>
                    <input type="username" className="form-control" name='lastname' />
                </div>
                <div className="form-group">
                    <label> Username </label>
                    <input type="username" className="form-control" name='username' />
                </div>
                <div className="form-group">
                    <label> Birthday </label>
                    <input type='timestamp' className="form-control" name='birthday' />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        )
    }
}

export default SignIn;