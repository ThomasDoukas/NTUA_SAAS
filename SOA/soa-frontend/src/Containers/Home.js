import React from 'react';
import classes from '../Components/UI/Card.css';

class Home extends React.Component {    
    render() {
        return (
            <div>
                <br/>
                <h1>Welcome to AskMeAnything!</h1>
                <br/>
                <div className="row">
                    <div class="card" className={classes.card}>
                        <div className="card-body">
                            <h5 className="card-title"> Questions per keyword </h5>
                            <p className="card-text"> Shows questions containing specific keywords </p>
                            <a href="/bykeyword" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div class="card" className={classes.card}>
                        <div className="card-body">
                            <h5 className="card-title"> Questions by period </h5>
                            <p className="card-text"> Shows questions asked through a specific period </p>
                            <a href="/byperiod" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div class="card" className={classes.card}>
                        <div className="card-body">
                            <h5 className="card-title"> AskMe </h5>
                            <p className="card-text"> Ask the world a new question! </p>
                            <a href="/ask" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                    <div class="card" className={classes.card}>
                        <div className="card-body">
                            <h5 className="card-title"> Answer a Question </h5>
                            <p className="card-text"> Show the world what you know! </p>
                            <a href="/browse" className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}>Go!</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;