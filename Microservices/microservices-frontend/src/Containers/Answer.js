import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';

class Answer extends React.Component {

    render() {
        return (
            <div className={classes.customCard}>
                <p> {this.props.body} </p>
                <br />
                <p> Answered by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>
                
                <button
                    type='button'
                    class="btn btn-primary"
                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                    onClick={e => this.props.deleteAnswer(e, this.props.id)}
                    >
                Delete
                </button>
                    
                <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                    to={{ 
                    pathname: "/editanswer", 
                    state: {
                        questionTitle: this.props.questionTitle,
                        questionBody: this.props.questionBody,
                        questionLabels: this.props.questionLabels,
                        questionId: this.props.questionId,
                        id: this.props.id,
                        createdBy: this.props.createdBy,
                        body: this.props.body,
                        timeCreated: this.props.timeCreated,
                    }
                    }}>
                Edit
                </Link>

            </div>
        )
    }
}

export default Answer;