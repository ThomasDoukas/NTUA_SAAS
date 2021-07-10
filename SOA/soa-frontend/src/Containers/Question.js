import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';
import AuthContext from "../source/auth-context";

class Question extends React.Component {

    static contextType = AuthContext;

    render() {
        return (
            <div className={classes.customCard}>
                <h3> {this.props.title} </h3>
                <br />
                <div> {this.props.body} </div>
                <div> Tags: {this.props.labels} </div>
                <p className="card-text text-muted"> Posted by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>

                <div >
                <Link className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                    to={{
                        pathname: "/answer",
                        state: {
                            title: this.props.title,
                            body: this.props.body,
                            labels: this.props.labels,
                            timeCreated: this.props.timeCreated,
                            id: this.props.id,
                            createdBy: this.props.createdBy
                        }
                    }}>
                    Answer
                    </Link>

                    {((this.context.email === this.props.createdBy) && 
                    <button
                        type='button'
                        className="btn btn-primary"
                        style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                        onClick={e => this.props.deleteQuestion(e, this.props.id)}
                        >
                    Delete
                    </button>
                    )}
                    

                    {((this.context.email === this.props.createdBy) && 
                    <Link className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                        to={{ 
                        pathname: "/editquestion", 
                        state: {
                            title: this.props.title,
                            body: this.props.body,
                            labels: this.props.labels,
                            createdBy: this.props.createdBy,
                            id: this.props.id
                        }
                        }}>
                    Edit
                    </Link>
                    )}
                    </div>

            </div>  
        )          
    } 
}

export default Question;