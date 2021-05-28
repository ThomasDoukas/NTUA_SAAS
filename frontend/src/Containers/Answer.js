import React from 'react';
import { Link } from 'react-router-dom';

class Answer extends React.Component {

    render() {
        return (
            <div class='card' style={{backgroundColor: "##E0BCEF", borderColor: "##E0BCEF", width: "25rem"}}>
                <div class="card-body">
                <p class="card-text"> {this.props.body} </p>
                <br/>
                <p class="card-title font-weight-bold"> Answered by: {this.props.createdBy} </p>
                <p class="card-text font-italic"> Upvotes: {this.props.upvotes} </p>
                </div>
            </div>
        )
    }
}

export default Answer;