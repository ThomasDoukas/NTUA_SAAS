import React from 'react';
import Question from './Question';
import classes from '../Components/Auth/AuthForm.module.css'
import AuthContext from "../source/auth-context";
import classes2 from '../Components/UI/AskQuestionForm.module.css'

class BrowseQuestions extends React.Component {

    state = {
        questions: [],
        labels: undefined,
        fromDate: undefined,
        toDate: undefined,
        createdBy: undefined,
        textSearch: undefined,
        labelsList: ['']
    }

    static contextType = AuthContext;

    getAllQuestions = async (e) => {
        if (e) e.preventDefault();
        await fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/questions/search"
                },
                body: JSON.stringify({
                })
            }).then(res => {
                if (res.ok) {
                    return res.json().then((data) => {
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
        var labels = undefined
        console.log(labels)
        if (this.state.labelsList[0] !== '') {
            labels = this.state.labelsList
        }
        await fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/questions/search"
                },
                body: JSON.stringify({
                    fromDate: ((this.state.fromDate && this.state.fromDate !== "") ? `${this.state.fromDate}` : undefined),
                    toDate: ((this.state.toDate && this.state.toDate !== "") ? `${this.state.toDate}` : undefined),
                    email: (this.state.createdBy ? `${this.state.createdBy}` : undefined),
                    labels: labels,
                    textSearch: (this.state.textSearch ? `${this.state.textSearch}` : undefined)
                })
            }).then(res => {
                if (res.ok) {
                    return res.json().then((data) => {
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

    deleteQuestion = async (e, id) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-soa.herokuapp.com/saas/soa/esb`,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/questions/${id}`,
                    'Authorization': `Bearer ${this.context.jwt}`
                }
            }).then(res => {
                if (res.ok) {
                    return res.json().then(
                        this.getQuestions()
                    );
                } else {
                    return res.json().then((data) => {
                    alert(data.message);
                    });
                }
            });        
    }

    handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...this.state.labelsList];
        list[index] = value;
        this.setState({
            labelsList:list
        });
      };
       
      // handle click event of the Remove button
    handleRemoveClick = index => {
        const list = [...this.state.labelsList];
        list.splice(index, 1);
        this.setState({
            labelsList:list
        });
      };
       
      // handle click event of the Add button
    handleAddClick = () => {
        const list = [...this.state.labelsList];
        this.setState({
            labelsList:[list, ""]
        });
      };

    handleChange = (e) => {
        this.setState({
            labels: [`${e.target.value}`]
        });
    };

    handleChangeFrom = (e) => {
        this.setState({
            fromDate: `${e.target.value}`
        });
    };

    handleChangeTo = (e) => {
        this.setState({
            toDate: `${e.target.value}`
        });
    };

    handleChangeEmail = (e) => {
        this.setState({
            createdBy: `${e.target.value}`
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
            <div className="container">
                <div className="row align-items-start">
                    <section>
                            <div>
                                <h1 htmlFor="questionTitle" name='title' style={{ width: "max-content" }}> Select Question </h1>
                                {this.state.questions.map(questions =>
                                    <row>
                                        <Question
                                            id={questions.questionId}
                                            timeCreated={questions.timeCreated}
                                            title={questions.title}
                                            createdBy={questions.createdBy}
                                            body={questions.body}
                                            labels={questions.labels.map(el => { return `#${el.labelTitle} ` })}
                                            deleteQuestion = {this.deleteQuestion}
                                        />
                                    </row>
                                )}
                            </div>
                    </section>

                    <section className={classes.auth}>
                        <div>
                            <h1>Filters</h1>
                            <div className="form-group">
                                <div>
                                    <label>User:</label>
                                    <input className="form-control" type="email" name='createdBy' placeholder="ex. wena@indlovu.gr" onChange={this.handleChangeEmail} />
                                </div>
                                <br />
                                <div>
                                    <label>Text Search:</label>
                                    <input className="form-control" type="text" name='textSearch' placeholder="Type a word to search from question body" onChange={this.handleChangeText} />
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
                                {this.state.labelsList.map((x, i) => {
                                return(
                                <div className={classes2.actions}>
                                    <input
                                    rows="1"
                                    className="form-control"
                                    placeholder='Add a keyword'
                                    value={x}
                                    onChange={e => this.handleInputChange(e, i)}
                                    />
                                    <br/>
                                    <div className="btn-box">
                                    {this.state.labelsList.length !== 1 && <button className="button" onClick={() => this.handleRemoveClick(i)}>Remove</button>}
                                    {this.state.labelsList.length - 1 === i && <button className="button" onClick={this.handleAddClick} >Add</button>}
                                    </div>
                                </div>
                                );
                                })}
                                <br />
                                <button
                                    type='button'
                                    className="btn btn-primary"
                                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                                    onClick={this.getQuestions}
                                >
                                    Filter questions
                                </button>
                                <button
                                    type='button'
                                    className="btn btn-primary"
                                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE", marginInline: '0.2rem' }}
                                    onClick={this.getAllQuestions}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default BrowseQuestions;