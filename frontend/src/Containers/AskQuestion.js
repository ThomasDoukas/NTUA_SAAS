import { getDefaultNormalizer } from '@testing-library/dom';
import React, { Component } from 'react';
//import './AskQuestion.css';
import { Jumbotron, Col, Image, Container, Row } from 'react-bootstrap';

class AskQuestion extends React.Component {

    state = {
        title: undefined,
        body: undefined,
        labels: undefined
    }

    submitFunc = async (e) => {
        if (e) e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.body.value;
        const labels = e.target.elements.labels.value;
        const api_call = await fetch('http://localhost:3000/saas/architecture/questions/',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        createdBy: 'tom.doukas7@gmail.com',
                        labels: [{labelTitle: "programming"}]
                    })
                });
                if (api_call.ok) {
                    const data = await api_call.json();
                    console.log(data);
                }
            }

    render() {
        return (
            <form onSubmit={this.submitFunc}>
            <div class="col-md-4 mb-3">
            <h1>Ask a Question</h1>
            </div>
            <div class="col-md-4 mb-3">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Question Title</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='title'></textarea>
            </div>
            </div>
            <div class="col-md-5">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Question Text</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='body'></textarea>
            </div>
            </div>
            <div class="col-md-4 mb-3">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Labels</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='labels'></textarea>
            </div>
            </div>
            <div class="form-row">
            <div class="col-auto">
            <button class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} type="submit">Submit</button>
            </div>
            <div class="col-auto">
            <a class="btn btn-danger" exact href="/" role="button">Cancel</a>
            </div>
            </div>
            </form>            
        )
    }
}

export default AskQuestion;