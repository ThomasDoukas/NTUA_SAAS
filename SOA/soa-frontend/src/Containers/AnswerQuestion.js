import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import Answer from './Answer';
import AuthContext from '../source/auth-context';

const AnswerQuestion = () => {
    const history = useHistory();

    const bodyInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const location = useLocation();

    const [answers, setAnswers] = useState([]);

    const getAnswers = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/soa/esb',
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/questions/${location.state.id}`
                }
            }).then(res => {
                if (res.ok) {
                    return res.json().then((data) => {
                        setAnswers(data.answers);
                    });
                } else {
                    return res.json().then((data) => {
                        alert(data.message);
                    });
                }
            });

    };

    const deleteAnswer = async (e, id) => {
        if (e) e.preventDefault();
        console.log(id);
        await fetch(`http://localhost:3000/saas/soa/esb`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/answers/${id}`,
                        'Authorization': 'Bearer ' + `${authCtx.jwt}`
                    }
                }).then(res => {
                    if (res.ok) {
                        return res.json().then(
                            getAnswers()
                        );
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
    }

    useEffect(() => {
        getAnswers();
    }, []);


    const submitFunc = async (e) => {
        if (e) e.preventDefault();
        const body = bodyInputRef.current.value;
        fetch('http://localhost:3000/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/answers",
                    'Authorization': 'Bearer ' + authCtx.jwt
                },
                body: JSON.stringify({
                    createdBy: authCtx.email,
                    body: body,
                    questionId: location.state.id
                })
            }).then(res => {
                if (res.ok) {
                    alert('Answer submitted succesfully!');
                    history.replace('/browse')
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        alert(data.message);
                    });
                }
            });

    }


    return (
        <form onSubmit={submitFunc}>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <h1> {location.state.title} </h1>
                </div>
            </div>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <p> {location.state.body} </p>
                </div>
            </div>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <p> Tags: {location.state.labels}</p>
                </div>
            </div>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <p> Created by : {location.state.createdBy} </p>
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">

                    {answers.length > 0 ?
                        <label for="exampleFormControlTextarea1">
                            Other answers
                        </label>
                        :
                        <label for="exampleFormControlTextarea1">
                            No answers for this question!
                        </label>
                    }

                    {answers.map(answers => <row>
                        <Answer
                            id={answers.answerId}
                            createdBy={answers.createdBy}
                            body={answers.body}
                            timeCreated={answers.timeCreated}
                            questionTitle={location.state.title}
                            questionBody={location.state.body}
                            questionLabels = {location.state.labels.map(el => { return `#${el.labelTitle}, ` })}
                            questionTimeCreated={location.state.timeCreated}
                            questionId={location.state.id}
                            disableButton={true}
                            deleteAnswer={deleteAnswer}
                        />
                    </row>
                    )}
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">My Answer</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='body' required ref={bodyInputRef} />
                </div>
            </div>
            <div class="form-row">
                <div class="col-auto">
                    <button class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }} type="submit"> Submit Answer </button>
                </div>
                <div class="col-auto">
                    <a class="btn btn-danger" exact href="/browse" role="button"> Nevermind </a>
                </div>
            </div>
        </form>
    )
}

export default AnswerQuestion;