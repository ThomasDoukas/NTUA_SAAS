import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';

class Answer extends React.Component {

    render() {
        return (
            <div className={classes.customCard}>
                <p> {this.props.body} </p>
                <br />
                <p> Answered by: {this.props.createdBy} </p>
                <p> Answered by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>
                {this.props.disableButton ? undefined :
                    <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                        to={{
                            pathname: "/answer",
                            state: {
                                title: this.props.questionTitle,
                                body: this.props.questionBody,
                                labels: this.props.questionLabels,
                                timeCreated: this.props.questionTimeCreated,
                                id: this.props.questionId
                            }
                        }}>
                        Answer
                            </Link>
                }
            </div>
        )
    }
}

export default Answer;