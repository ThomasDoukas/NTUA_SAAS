import React, {useContext, useEffect, useState} from 'react';
import Question from './Question';
import AuthContext from '../source/auth-context';

const MyQuestions = () => {

    const authCtx = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);

    const getQuestions = async (e) => {
        if (e) e.preventDefault();
        await fetch('https://saas21-team47-ms-browse.herokuapp.com/saas/microservices/browse/questions/usersQuestions',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authCtx.jwt}`
                    },
                    body: JSON.stringify({
                        email: authCtx.email
                    })
                }).then(res => {
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
        await fetch(`https://saas21-team47-ms-mng-questions.herokuapp.com/saas/microservices/manageQuestions/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authCtx.jwt}`
                    }
                }).then(res => {
                    if (res.ok) {
                        return res.json().then(
                            getQuestions()
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
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