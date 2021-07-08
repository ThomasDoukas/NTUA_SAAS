import React, { useState } from 'react';

const AuthContext = React.createContext({
    jwt:'',
    email:'',
    userId:'',
    isLoggedIn: false,
    login: (jwt, email, userId) => {},
    switchEmail: (email) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialJwt = localStorage.getItem('jwt');
    const initialEmail = localStorage.getItem('email');
    const initialUserId = localStorage.getItem('userId');
    const [jwt, setToken] = useState(initialJwt);
    const [email, setEmail] = useState(initialEmail);
    const [userId, setUserId] = useState(initialUserId);
    const userIsLoggedIn = !!jwt;
    const loginHandler = (jwt, email, userId) => {
        setToken(jwt);
        setEmail(email);
        setUserId(userId);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', userId);
    };
    const logoutHandler = () => {
        alert('Succesfully logged out!')
        setToken(null);
        localStorage.removeItem('jwt');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
    };

    const switchHandler = (email) => {
        localStorage.removeItem('email');
        setEmail(email);
        localStorage.setItem('email', email);
    }

    const contextValue = {
        jwt: jwt,
        email: email,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        switchEmail: switchHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>;
};

export default AuthContext;