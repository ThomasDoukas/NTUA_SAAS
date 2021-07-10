import React, { useState, useContext, useRef, useEffect } from 'react';
import classes from '../Components/Auth/AuthForm.module.css'
import { useHistory } from 'react-router';
import AuthContext from "../source/auth-context";

const EditProfile = () => {
    const history = useHistory();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const fnameInputRef = useRef();
    const lnameInputRef = useRef();
    const unameInputRef = useRef();
    const bdayInputRef = useRef();

    const [prevEmail, setPrevEmail] = useState('');
    const [prevFirstName, setPrevFirstName] = useState('');
    const [prevLastName, setPrevLastName] = useState('');
    const [prevUsername, setPrevUsername] = useState('');

    const authCtx = useContext(AuthContext);

    const getUserInfo = async (e) => {
        if (e) e.preventDefault();
        await fetch(`https://saas21-team47-soa.herokuapp.com/saas/soa/esb`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/users/${authCtx.userId}`,
                        'Authorization': `Bearer ${authCtx.jwt}`
                    }
                }).then((res) => {
                    if (res.ok) {
                        return res.json().then((data) => {
                            setPrevEmail(data.email);
                            setPrevFirstName(data.firstName);
                            setPrevLastName(data.lastName);
                            setPrevUsername(data.username);                           
                        });
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const firstname = fnameInputRef.current.value;
        const lastname = lnameInputRef.current.value;
        const username = unameInputRef.current.value;
        const birthday = bdayInputRef.current.value;

        fetch('https://saas21-team47-soa.herokuapp.com/saas/soa/esb',
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "url-destination": `saas/soa/users/${authCtx.userId}`,
                    'Authorization': `Bearer ${authCtx.jwt}`
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                    username: username,
                    birthday: birthday
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let alertMessage = data.message;
                        throw new Error(alertMessage);
                    });
                }
            }).then((res) => {
                if (res.email !== authCtx.email) {
                    authCtx.switchEmail(email);
                    history.replace('/');                
                } else {
                    history.replace('/');
                }
            })
            .catch((err) => {
                alert(err.message);
            });
        
    }

    useEffect(() => {
        getUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <section className={classes.auth}>
            <h1> Edit Profile </h1>
            <form onSubmit = {submitHandler}>
                <div className={classes.control}>
                    <label> Email address </label>
                    <input type="email" className="form-control" defaultValue={prevEmail} name='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label> Password </label>
                    <input type="password" className="form-control" placeholder="Enter password..." name='password' required ref={passwordInputRef} />
                </div>
                <div className={classes.control}>
                    <label> First Name </label>
                    <input type="username" className="form-control" defaultValue={prevFirstName} name='firstname' required ref={fnameInputRef} />
                </div>
                <div className={classes.control}>
                    <label> Last Name </label>
                    <input type="username" className="form-control" defaultValue={prevLastName} name='lastname' required ref={lnameInputRef} />
                </div>
                <div className={classes.control}>
                    <label> Username </label>
                    <input type="username" className="form-control" defaultValue={prevUsername} name='username' required ref={unameInputRef} />
                </div>
                <div className={classes.control}>
                    <label> Birthday </label>
                    <input type='date' className="form-control" name='birthday' required ref={bdayInputRef} />
                </div>
                <div className={classes.actions}>
                    <button> Apply Changes </button>
                </div>
            </form>
        </section>
    );
};

export default EditProfile;