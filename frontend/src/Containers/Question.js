import React from 'react';
import { Link } from 'react-router-dom';

class Question extends React.Component {

    render() {
        return (
            <div class='card' style={{backgroundColor: "##E0BCEF", borderColor: "##E0BCEF", width: "25rem"}}>
                <div class="card-body">
                <h2 class="card-title"> {this.props.title} </h2>
                <p class="card-text"> {this.props.body} </p>
                <p class="card-text"> Tags: {this.props.labels} </p>
                <p class="card-text"> Creation date: {this.props.timeCreated.split('T')[0]} </p>
                <Link class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} 
                to={{
                pathname: "/answer",
                state: {title: this.props.title,
                        body: this.props.body, 
                        labels: this.props.labels,
                        timeCreated: this.props.timeCreated,
                        id: this.props.id}
                }}>
                Answer
                </Link>
                </div>
            </div>
        )
    }
}

export default Question;