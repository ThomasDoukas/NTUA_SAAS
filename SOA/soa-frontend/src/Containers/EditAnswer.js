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
        await fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/questions/${location.state.id}`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const submitFunc = async (e) => {
        if (e) e.preventDefault();
        const body = bodyInputRef.current.value;
        fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/answers/${location.state.id}`,
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