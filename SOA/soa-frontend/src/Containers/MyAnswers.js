import React, { useContext, useEffect, useState } from 'react';
import Answer from './Answer';
import AuthContext from '../source/auth-context';
import { Link } from 'react-router-dom';

const MyAnswers = () => {


    const authCtx = useContext(AuthContext);
    const [answers, setAnswers] = useState([]);

    const getAnswers = async (e) => {
        if (e) e.preventDefault();
        await fetch('http://localhost:3000/saas/soa/esb',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": "saas/soa/answers/usersAnswers",
                    'Authorization': 'Bearer ' + authCtx.jwt
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
                    </row>
                    )}
                </div>
            </section>
        </div >
    )
}


export default MyAnswers;