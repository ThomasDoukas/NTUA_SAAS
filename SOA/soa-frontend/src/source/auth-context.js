import React, { useState } from 'react';

const AuthContext = React.createContext({
    jwt:'',
    email:'',
    isLoggedIn: false,
    login: (jwt, email) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const initialJwt = localStorage.getItem('jwt');
    const initialEmail = localStorage.getItem('email');
    const [jwt, setToken] = useState(initialJwt);
    const [email, setEmail] = useState(initialEmail);
    const userIsLoggedIn = !!jwt;
    const loginHandler = (jwt, email) => {
        setToken(jwt);
        setEmail(email);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('email', email);
    };
    const logoutHandler = () => {
        alert('Succesfully logged out!')
        setToken(null);
        localStorage.removeItem('jwt');
        localStorage.removeItem('email');
    };

    const contextValue = {
        jwt: jwt,
        email: email,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>;
};

export default AuthContext;