import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import AuthContext from '../source/auth-context';

const EditAnswer = () => {
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

    useEffect(() => {
        getAnswers();
    }, []);


    const submitFunc = async (e) => {
        if (e) e.preventDefault();
        const body = bodyInputRef.current.value;
        fetch('http://localhost:3000/saas/soa/esb',
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/answers/${location.state.questionId}`,
                    'Authorization': 'Bearer ' + authCtx.jwt
                },
                body: JSON.stringify({
                    body: body
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
            {console.log(location.state.questionId)}
            {console.log(location.state.id)}
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <h1> {location.state.questionTitle} </h1>
                </div>
            </div>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <p> {location.state.questionBody} </p>
                </div>
            </div>
            <div class='row-auto'>
                <div class="col-md-4 mb-3">
                    <p> Tags: {location.state.questionLabels}</p>
                </div>
            </div>
            
            <div class="col-md-5">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">My Answer</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" defaultValue={location.state.body} name='body' required ref={bodyInputRef} />
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

export default EditAnswer;