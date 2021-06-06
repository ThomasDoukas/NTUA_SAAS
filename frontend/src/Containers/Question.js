import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Components/UI/CustomCard.module.css';

class Question extends React.Component {

    render() {
        return (
            // <div class='card' style={{backgroundColor: "##E0BCEF", borderColor: "##E0BCEF", width: "30rem"}}>
            // <div class='card' style={{backgroundColor: "##E0BCEF", borderColor: "##E0BCEF", width: "30rem"}}>
            <div className={classes.customCard}>
                {/* <p class="card-title font-weight-bold"> {this.props.title} </p>
                        <p class="card-text"> {this.props.body} </p>
                        <p class="card-text"> Tags: {this.props.labels} </p>
                        <p class="card-text text-muted"> Posted by: {this.props.createdBy} on {this.props.timeCreated.split('T')[0]} </p> */}
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
            // </div>
        )
    }
}

export default Question;