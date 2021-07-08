import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';
import AuthContext from "../source/auth-context";

class Question extends React.Component {

    static contextType = AuthContext;

    userOpsEnable = async (e) => {
        if (e) e.preventDefault();
        if (this.context.email == this.props.createdBy) {
            return true;
        } else return false;
    };

    render() {
        if (this.userOpsEnable) {
            return (
                <div className={classes.customCard}>
                    <h3> {this.props.title} </h3>
                    <br />
                    <div> {this.props.body} </div>
                    <div> Tags: {this.props.labels} </div>
                    <p class="card-text text-muted"> Posted by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>
                    <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                        to={{
                            pathname: "/answer",
                            state: {
                                title: this.props.title,
                                body: this.props.body,
                                labels: this.props.labels,
                                timeCreated: this.props.timeCreated,
                                id: this.props.id
                            }
                        }}>
                        Answer
                        </Link>
    
                        <button
                            type='button'
                            class="btn btn-primary"
                            style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                            onClick={e => this.props.deleteQuestion(e, this.props.id)}
                            >
                        Delete
                        </button>
                    
                        <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
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
                </div>  
            )          
        } else {
            return (
                <div className={classes.customCard}>
                    <h3> {this.props.title} </h3>
                    <br />
                    <div> {this.props.body} </div>
                    <div> Tags: {this.props.labels} </div>
                    <p class="card-text text-muted"> Posted by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p>
                    <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                        to={{
                            pathname: "/answer",
                            state: {
                                title: this.props.title,
                                body: this.props.body,
                                labels: this.props.labels,
                                timeCreated: this.props.timeCreated,
                                id: this.props.id
                            }
                        }}>
                        Answer
                        </Link>
                </div>
            )
        }
        
        
    }
}

export default Question;