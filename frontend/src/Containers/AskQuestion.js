import React, { useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { Redirect } from 'react-router';
import AuthContext from '../source/auth-context';
import classes from '../Components/UI/AskQuestionForm.module.css'

const AskQuestion = () => {
    const history = useHistory();
    
    const titleInputRef = useRef();
    const bodyInputRef = useRef();
    const labelsInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const submitFunc = (e) => {
        if (e) e.preventDefault();
        const title = titleInputRef.current.value;
        const body = bodyInputRef.current.value;
        const labels = labelsInputRef.current.value;
        const jwt = authCtx.jwt;
        fetch('http://localhost:3000/saas/architecture/questions',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        createdBy: authCtx.email,
                        labels: [{labelTitle: labels}]
                    })
                }).then(res => {
                    if (res.ok) {
                        alert('Question submitted succesfully!');
                        history.replace('/')
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
                
            }

        return (
            <form onSubmit={submitFunc} className={classes.askQuestion}>

                {/* <div class="col-md-4 mb-3"> */}
                <h1>Ask a Question</h1>
                {/* </div> */}

                {/* <div class="col-md-4 mb-3"> */}
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Question Title</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='title' required ref={titleInputRef} />
                    </div>
                {/* </div> */}

                {/* <div class="col-md-5"> */}
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Question Text</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name='body' required ref={bodyInputRef} />
                    </div>
                {/* </div> */}

                {/* <div class="col-md-4 mb-3"> */}
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Labels</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='labels' required ref={labelsInputRef} />
                    </div>
                {/* </div> */}
                <br/>

                <div class="form-row">
                    <div class="col-auto">
                        <button class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} type="submit">Submit</button>
                    </div>

                    <div class="col-auto">
                        <a class="btn btn-danger" exact href="/" role="button">Cancel</a>
                    </div>
                </div>
            </form>            
        )
    }


export default AskQuestion;