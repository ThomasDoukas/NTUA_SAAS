import React, { useEffect, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import AuthContext from '../source/auth-context';

const EditAnswer = () => {
    const history = useHistory();

    const bodyInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const location = useLocation();

    const getAnswers = async (e) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-ms-browse.herokuapp.com/saas/microservices/browse/questions/${location.state.id}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
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
        fetch(`https://saas21-team47-ms-mng-answers.herokuapp.com/saas/microservices/manageAnswers/${location.state.id}`,
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authCtx.jwt}`
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
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <h1> {location.state.questionTitle} </h1>
                </div>
            </div>
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <p> {location.state.questionBody} </p>
                </div>
            </div>
            <div className='row-auto'>
                <div className="col-md-4 mb-3">
                    <p> Tags: {location.state.questionLabels}</p>
                </div>
            </div>
            
            <div className="col-md-5">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">My Answer</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" defaultValue={location.state.body} name='body' required ref={bodyInputRef} />
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

export default EditAnswer;