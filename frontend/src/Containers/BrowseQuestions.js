import React from 'react';
import Question from './Question';
import classes from '../Components/Auth/AuthForm.module.css'
class BrowseQuestions extends React.Component {

    state = {
        questions: [],
        labels: undefined,
        fromDate: undefined,
        toDate: undefined,
        email: undefined,
        textSearch: undefined
    }

    getAllQuestions = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/architecture/questions/search',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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

    getQuestions = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/architecture/questions/search',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fromDate: (this.state.fromDate ? `${this.state.fromDate}` : undefined),
                    toDate: (this.state.toDate ? `${this.state.toDate}` : undefined),
                    email: (this.state.email ? `${this.state.email}` : undefined),
                    labels: (this.state.labels ? this.state.labels : undefined),
                    textSearch: (this.state.textSearch ? `${this.state.textSearch}` : undefined)
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

    handleChange = (e) => {
        this.setState({
            labels: [`${e.target.value}`]
        });
    };

    handleChangeFrom = (e) => {
        this.setState({
            fromDate: [`${e.target.value}`]
        });
    };

    handleChangeTo = (e) => {
        this.setState({
            toDate: [`${e.target.value}`]
        });
    };

    handleChangeEmail = (e) => {
        this.setState({
            email: `${e.target.value}`
        });
    };

    handleChangeText = (e) => {
        this.setState({
            textSearch: `${e.target.value}`
        });
    };

    componentDidMount() {
        this.getAllQuestions();
    };

    render() {
        return (
            <div class="container">
                <div class="row align-items-start">
                    <section>
                            <div>
                                <h1 for="questionTitle" name='title' style={{ width: "max-content" }}> Select Question </h1>
                                {this.state.questions.map(questions =>
                                    <row>
                                        <Question
                                            id={questions.questionId}
                                            timeCreated={questions.timeCreated}
                                            title={questions.title}
                                            createdBy={questions.createdBy}
                                            body={questions.body}
                                            labels={questions.labels.map(el => { return `#${el.labelTitle}, ` })}
                                        />
                                    </row>
                                )}
                            </div>
                    </section>

                    <section className={classes.auth}>
                        <div>
                            <h1>Filters</h1>
                            <div class="form-group">
                                <div>
                                    <label>User:</label>
                                    <input class="form-control" type="email" name='email' placeholder="ex. wena@indlovu.gr" onChange={this.handleChangeEmail} />
                                </div>
                                <br />
                                <div>
                                    <label>Keywords:</label>
                                    <input class="form-control" type="text" name='labels' placeholder="Input keyword" onChange={this.handleChange} />
                                </div>
                                <br />
                                <div>
                                    <label>Text Search:</label>
                                    <input class="form-control" type="text" name='textSearch' placeholder="Type a word to search from question body" onChange={this.handleChangeText} />
                                </div>
                                <br />
                                <div>
                                    <label>From:</label>
                                    <input type='date' className="form-control" name='fromDate' onChange={this.handleChangeFrom} />
                                </div>
                                <br />
                                <div>
                                    <label>To:</label>
                                    <input type='date' className="form-control" name='toDate' onChange={this.handleChangeTo} />
                                </div>
                                <br />
                                <button
                                    type='button'
                                    class="btn btn-primary"
                                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                                    onClick={this.getQuestions}
                                >
                                    Filter questions
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* <div class="col-md-4 mb-3">
                        <div class="form-group">
                            <input class="form-control" type="text" name='labels' placeholder="Keywords" />
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default BrowseQuestions;