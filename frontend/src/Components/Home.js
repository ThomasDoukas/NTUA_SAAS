import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
//import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to AskMeAnything!</h1>
                <div class="row">
                <div class="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title">Questions per keyword</h5>
                        <p class="card-text">Shows questions containing specific keywords</p>
                        <a href="/bykeyword" class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}}>Go!</a>
                    </div>
                    </div>
                    <div class="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title">Questions by period</h5>
                        <p class="card-text">Shows questions asked through a specific period</p>
                        <a href="/byperiod" class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}}>Go!</a>
                    </div>
                    </div>
                    <div class="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title">AskMe</h5>
                        <p class="card-text">Ask the world a new question! </p>
                        <a href="/byperiod" class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}}>Go!</a>
                    </div>
                    </div>
                    <div class="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title">Answer a Question</h5>
                        <p class="card-text">Show the world what you know! </p>
                        <a href="/byperiod" class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}}>Go!</a>
                    </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Home;