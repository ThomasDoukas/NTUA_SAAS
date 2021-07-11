import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

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
    const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'email', 'userId' ]);
    const initialJwt = cookies.jwt
    const initialEmail = cookies.email
    const initialUserId = cookies.userId
    const [jwt, setToken] = useState(initialJwt);
    const [email, setEmail] = useState(initialEmail);
    const [userId, setUserId] = useState(initialUserId);
    const userIsLoggedIn = !!jwt;
    const loginHandler = (jwt, email, userId) => {
        setToken(jwt);
        setEmail(email);
        setUserId(userId);
        setCookie('jwt', jwt, { path: '/' });
        setCookie('email', email, { path: '/' });
        setCookie('userId', userId, { path: '/' });
    };
    const logoutHandler = () => {
        alert('Succesfully logged out!')
        setToken(null);
        removeCookie('jwt');
        removeCookie('email');
        removeCookie('userId');
    };

    const switchHandler = (email) => {
        removeCookie('email');
        setEmail(email);
        setCookie('email', email, { path: '/' });
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