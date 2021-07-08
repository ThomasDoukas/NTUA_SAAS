import React from 'react';
import Question from './Question';
import classes from '../Components/Auth/AuthForm.module.css'
import AuthContext from "../source/auth-context";

class BrowseQuestions extends React.Component {

    state = {
        questions: [],
        labels: undefined,
        fromDate: undefined,
        toDate: undefined,
        createdBy: undefined,
        textSearch: undefined,
        labelsList:[""]
    }

    static contextType = AuthContext;

    getAllQuestions = async (e) => {
        console.log(this.context)
        console.log('this was thw getAllQuestions one')
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/soa/esb',
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
        await fetch('http://localhost:3000/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/questions/search"
                },
                body: JSON.stringify({
                    fromDate: (this.state.fromDate ? `${this.state.fromDate}` : undefined),
                    toDate: (this.state.toDate ? `${this.state.toDate}` : undefined),
                    email: (this.state.createdBy ? `${this.state.createdBy}` : undefined),
                    labels: (this.state.labelsList ? this.state.labelsList : undefined),
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

    deleteQuestion = async (e, id) => {
        if (e) e.preventDefault();
        console.log(id);
        await fetch(`http://localhost:3000/saas/soa/esb`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/questions/${id}`,
                        'Authorization': 'Bearer ' + `${this.context.jwt}`
                    }
                }).then(res => {
                    if (res.ok) {
                        return res.json().then(
                            this.getQuestions()
                        );
                    } else {
                        return res.json().then((data) => {
                        console.log(data)
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
                            <div class="form-group">
                                <div>
                                    <label>User:</label>
                                    <input class="form-control" type="email" name='createdBy' placeholder="ex. wena@indlovu.gr" onChange={this.handleChangeEmail} />
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
                                {this.state.labelsList.map((x, i) => {
                                return(
                                <div className="box">
                                    <input
                                    rows="1"
                                    class="form-control"
                                    placeholder='Add a keyword'
                                    value={x}
                                    onChange={e => this.handleInputChange(e, i)}
                                    />
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
                                    class="btn btn-primary"
                                    style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                                    onClick={this.getQuestions}
                                >
                                    Filter questions
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