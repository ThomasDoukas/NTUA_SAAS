import React, { useContext, useEffect, useState } from 'react';
import Answer from './Answer';
import AuthContext from '../source/auth-context';

const MyAnswers = () => {


    const authCtx = useContext(AuthContext);
    const [answers, setAnswers] = useState([]);

    const getAnswers = async (e) => {
        if (e) e.preventDefault();
        await fetch('https://saas21-team47-ms-browse.herokuapp.com/saas/microservices/browse/answers/usersAnswers',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authCtx.jwt}`
                },
                body: JSON.stringify({
                    createdBy: authCtx.email
                })
            }).then(res => {
                if (res.ok) {
                    return res.json().then((data) => {
                        setAnswers(data);
                    });
                } else {
                    return res.json().then((data) => {
                        alert(data.message);
                    });
                }
            });
    }

    const deleteAnswer = async (e, id) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-ms-mng-answers.herokuapp.com/saas/microservices/manageAnswers/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
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

    return (
        <div className="container">
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
                                timeCreated={answers.timeCreated}
                                questionTitle={answers.question.title}
                                disableButton={true}
                                questionBody={answers.question.body}
                                questionLabels = {answers.question.labels.map(el => { return `#${el.labelTitle}, ` })}
                                questionTimeCreated={answers.question.timeCreated}
                                questionId={answers.question.questionId}
                                deleteAnswer={deleteAnswer}
                                
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