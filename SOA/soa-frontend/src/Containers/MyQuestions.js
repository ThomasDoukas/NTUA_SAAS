import React, {useContext, useEffect, useState} from 'react';
import Question from './Question';
import AuthContext from '../source/auth-context';

const MyQuestions = () => {

    const authCtx = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);

    const getQuestions = async (e) => {
        if (e) e.preventDefault();
        console.log(authCtx.jwt);
        await fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": "saas/soa/questions/usersQuestions",
                        'Authorization': 'Bearer ' + `${authCtx.jwt}`
                    },
                    body: JSON.stringify({
                        email: authCtx.email
                    })
                }).then(res => {
                    console.log(res);
                    if (res.ok) {
                        return res.json().then((data) => {
                            setQuestions(data);
                            });
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
            }

    const deleteQuestion = async (e, id) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-soa.herokuapp.com/saas/soa/esb`,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/questions/${id}`,
                    'Authorization': 'Bearer ' + `${authCtx.jwt}`
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

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div class="container">
            <section>
                <div>
                    <br/>
                    <h1 for="questionTitle" name='title'>My Questions</h1>
                    {questions.map(questions => 
                    <div>
                        <Question
                            id = {questions.questionId}
                            timeCreated = {questions.timeCreated}
                            title = {questions.title}
                            createdBy = {questions.createdBy}
                            body = {questions.body}
                            labels = {questions.labels.map(el => {return `#${el.labelTitle}, `})}
                            deleteQuestion = {deleteQuestion}
                            />
                    </div>
                    )}
                </div>
            </section>
        </div>
    )
}


export default MyQuestions;