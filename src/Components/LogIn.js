import React, { Component } from 'react';
import './LogIn.css';
import { Jumbotron, Col, Image, Container, Row } from 'react-bootstrap';

class LogIn extends React.Component {

    state = {
        email: undefined,
        password: undefined
    }

    loginFunc = async (e) => {
        if (e) e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const api_call = await fetch('http://localhost:3000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                if (api_call.ok) {
                    const data = await api_call.json();
                    console.log(data);
                }
            console.log(email);
            console.log(password);
            }

    render() {
        return (
            <Container bsPrefix='group1'>
            <form onSubmit={this.loginFunc}>
                <h3>Log In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="ex. wena@indlovu.gr" name='email' />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password..." name='password' />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            </Container>
        )
    }
}

export default LogIn;