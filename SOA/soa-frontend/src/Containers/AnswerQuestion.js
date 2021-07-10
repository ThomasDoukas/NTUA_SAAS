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
        await fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
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
        await fetch(`https://saas21-team47-soa.herokuapp.com/saas/soa/esb`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/answers/${id}`,
                        'Authorization': `Bearer ${authCtx.jwt}`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const submitFunc = async (e) => {
        if (e) e.preventDefault();
        const body = bodyInputRef.current.value;
        fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/answers",
                    'Authorization': `Bearer ${authCtx.jwt}`
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
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <h1> {location.state.title} </h1>
                </div>
            </div>
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <p> {location.state.body} </p>
                </div>
            </div>
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <p> Tags: {location.state.labels}</p>
                </div>
            </div>
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <p> Created by : {location.state.createdBy} </p>
                </div>
            </div>
            <div className="col-md-5">
                <div className="form-group">

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
            <div className="col-md-5">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">My Answer</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name='body' required ref={bodyInputRef} />
                </div>
            </div>
            <div className="form-row">
                <div className="col-auto">
                    <button className="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }} type="submit"> Submit Answer </button>
                </div>
                <div className="col-auto">
                    <a className="btn btn-danger" exact href="/browse" role="button"> Nevermind </a>
                </div>
            </div>
        </form>
    )
}

export default AnswerQuestion;