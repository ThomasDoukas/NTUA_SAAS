import React from 'react';
import Question from './Question';

class BrowseQuestions extends React.Component {

    state = {
        questions: []
    }

    getQuestions = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/architecture/questions/search',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        // fromDate:'2021-05-28',
                        // toDate: '2021-05-28',
                        // labels: ['programming'],
                        // textSearch: 'this'
                    })
                }).then(res => {
                    if (res.ok) {
                        return res.json().then((data) => {
                            console.log(data);
                            this.setState({
                                questions: data
                            });
                            });
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
                
            }

    componentDidMount(){
        this.getQuestions();
    };

    render() {
        return (
            <div>
                <div class="col-md-4 mb-3">
                    <div class="form-group">
                        <br/>
                        <h1 for="questionTitle" name='title'>Select a Question</h1>
                        {this.state.questions.map(questions => <row>
                            <br/>
                            <Question
                                id = {questions.questionId}
                                timeCreated = {questions.timeCreated}
                                title = {questions.title}
                                body = {questions.body}
                                labels = {questions.labels[0].labelTitle} 
                                />
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
            </div>
        )
    }
}

export default BrowseQuestions;