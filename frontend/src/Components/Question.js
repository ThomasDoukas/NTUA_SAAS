import React from 'react';
import { Link } from 'react-router-dom';
import AnswerQuestion from './AnswerQuestion';
import {Redirect} from 'react-router-dom';

class Question extends React.Component {

    handleClick = () => {
        return(
        <Redirect
            to={{
            pathname: "/answer",
            state: {title: this.props.title,
                    body: this.props.body, 
                    labels: this.props.labels}
            }}
        />)
    }

    render() {
        return (
            <div class='card' style={{backgroundColor: "##E0BCEF", borderColor: "##E0BCEF", width: "25rem"}}>
                <div class="card-body">
                <h2 class="card-title"> {this.props.title} </h2>
                <p class="card-text"> {this.props.body} </p>
                <p class="card-text"> Tags: {this.props.labels} </p>
                <Link class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} 
                to={{
                pathname: "/answer",
                state: {title: this.props.title,
                        body: this.props.body, 
                        labels: this.props.labels}
                }}>
                Answer
                </Link>
                </div>
            </div>
        )
    }
}

export default Question;