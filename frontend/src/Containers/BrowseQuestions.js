import React, { Component } from 'react';
import Question from './Question';

class BrowseQuestions extends React.Component {
    render() {
        return (
            <div>
                <div class="col-md-4 mb-3">
                    <div class="form-group">
                        <br/>
                        <h1 for="questionTitle" name='title'>Select a Question</h1>
                        {this.props.questions.map(questions => <row>
                            <br/>
                            <Question
                                title={questions.title}
                                body={questions.body}
                                labels={questions.labels} />
                            <br/>
                        </row>
                        )}
                    </div>
                </div>

                <div class="col-md-4 mb-3">
                    <div class="form-group">
                        <input class="form-control" type="text" name='labels' placeholder="Keywords (read only)" readonly />
                    </div>
                </div>
                
                {/* <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> */}
            </div>
        )
    }
}

export default BrowseQuestions;