import React, { useState, useContext, useRef } from 'react';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router';
import AuthContext from '../../source/auth-context';

const AuthForm = () => {
    const history = useHistory();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const fnameInputRef = useRef();
    const lnameInputRef = useRef();
    const unameInputRef = useRef();
    const bdayInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        setIsLoading(true);
        if (isLogin) {
            fetch('http://localhost:3000/saas/soa/esb',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": "saas/soa/auth/login"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(res => {
                    setIsLoading(false);
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            let alertMessage = data.message;
                            throw new Error(alertMessage);
                        });
                    }
                })
                .then((data) => {
                    authCtx.login(data.access_token, email, data.userId);
                    history.replace('/myprofile');
                })
                .catch((err) => {
                    alert(err.message);
                });

        } else {

            const firstname = fnameInputRef.current.value;
            const lastname = lnameInputRef.current.value;
            const username = unameInputRef.current.value;
            const birthday = bdayInputRef.current.value;

            fetch('http://localhost:3000/saas/soa/esb',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": "saas/soa/auth/signup"
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
                    setIsLoading(false);
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            let alertMessage = data.message;
                            throw new Error(alertMessage);
                        });
                    }
                }).then((res) => {
                    authCtx.login(res.access_token, email, res.userId);
                    history.replace('/');
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }

    return(
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit = {submitHandler}>
                <div className={classes.control}>
                    <label> Email address </label>
                    <input type="email" className="form-control" placeholder="ex. wena@indlovu.gr" name='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label> Password </label>
                    <input type="password" className="form-control" placeholder="Enter password..." name='password' required ref={passwordInputRef} />
                </div>
                {!isLogin && <div className={classes.control}>
                    <label> First Name </label>
                    <input type="username" className="form-control" placeholder="Rick" name='firstname' required ref={fnameInputRef} />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label> Last Name </label>
                    <input type="username" className="form-control" placeholder="Astley" name='lastname' required ref={lnameInputRef} />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label> Username </label>
                    <input type="username" className="form-control" placeholder="R-Astley" name='username' required ref={unameInputRef} />
                </div>}
                {!isLogin && <div className={classes.control}>
                    <label> Birthday </label>
                    <input type='date' className="form-control" name='birthday' required ref={bdayInputRef} />
                </div>}
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create account'}</button>}
                    {isLoading && <p> Loading... </p>}
                    <button
                     type='button'
                     className={classes.toggle}
                     onClick={switchAuthModeHandler}
                    >
                     {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;