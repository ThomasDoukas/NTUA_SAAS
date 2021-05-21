import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Question from './Question';

class AnswerQuestion extends React.Component {
    render() {
        return (
            <form>
                <div class='row-auto'>
                    <div class="col-md-4 mb-3">
                        <h1> {this.props.location.state.title} </h1>
                    </div>
                </div>
                <div class='row-auto'>
                    <div class="col-md-4 mb-3">
                        <p1> {this.props.location.state.body} </p1>
                    </div>
                </div>
                <div class='row-auto'>
                    <div class="col-md-4 mb-3">
                        <p1> Tags: {this.props.location.state.labels}</p1>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Other answers</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='others'></textarea>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">My Answer</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='body'></textarea>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-auto">
                        <button class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}}type="submit"> Submit Answer </button>
                    </div>
                    <div class="col-auto">
                        <a class="btn btn-danger" exact href="/browse" role="button"> Nevermind </a>
                    </div>
                </div>
            </form>
        )
    }
}

export default AnswerQuestion;