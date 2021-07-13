import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';
import AuthContext from '../source/auth-context';

class Answer extends React.Component {

    static contextType = AuthContext;

    render() {
        return (
            <div className={classes.customCard}>
                <p> {this.props.body} </p>
                <br />
                <p> Answered by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>
                
                {((this.context.email === this.props.createdBy) && 
                <div>
                <button
                    type='button'
                    className ="btn btn-primary"
                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem'}}
                    onClick={e => this.props.deleteAnswer(e, this.props.id)}
                    >
                Delete
                </button>
                    
                <Link className ="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem'}}
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
                )}

            </div>
        )
    }
}

export default Answer;