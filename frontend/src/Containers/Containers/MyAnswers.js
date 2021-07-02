import React, { useContext, useEffect, useState } from 'react';
import Answer from './Answer';
import AuthContext from '../source/auth-context';
import { Link } from 'react-router-dom';

const MyAnswers = () => {


    const authCtx = useContext(AuthContext);
    const [answers, setAnswers] = useState([]);

    const getAnswers = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/architecture/answers/usersAnswers',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    createdBy: authCtx.email
                })
            }).then(res => {
                if (res.ok) {
                    return res.json().then((data) => {
                        console.log(data);
                        setAnswers(data);
                    });
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

    return (
        <div class="container">
            {/* <div class="col-md-4 mb-3"> */}
            <section>
                <div>
                    <br />
                    <h1 for="answerTitle" name='title'>My Answers</h1>
                    {answers.map(answers => <row>
                        <div>
                            <Answer
                                id={answers.answerId}
                                createdBy={answers.createdBy}
                                body={answers.body}
                                upvotes={answers.upvotes}
                                timeCreated={answers.timeCreated}
                                questionTitle={answers.question.title}
                                questionBody={answers.question.body}
                                questionLabels = {answers.question.labels.map(el => { return `#${el.labelTitle}, ` })}
                                questionTimeCreated={answers.question.timeCreated}
                                questionId={answers.question.questionId}
                                
                            />
                        </div>
                        {/* <Link class="btn btn-primary" style={{ backgroundColor: "#AA06EE", borderColor: "#AA06EE" }}
                            to={{
                                pathname: "/answer",
                                state: {
                                    title: answers.question.title,
                                    body: answers.question.body,
                                    labels: answers.question.labels.map(el => { return `#${el.labelTitle}, ` }),
                                    timeCreated: answers.question.timeCreated,
                                    id: answers.question.questionId
                                }
                            }}>
                            Answer
                            </Link> */}
                    </row>
                    )}
                </div>
            </section>

            {/* <div class="col-md-4 mb-3">
                <div class="form-group">
                    <input class="form-control" type="text" name='labels' placeholder="Keywords (read only)" readonly />
                </div>
            </div> */}
        </div >
    )
}


export default MyAnswers;