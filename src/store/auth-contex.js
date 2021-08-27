import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initToken = localStorage.getItem('token');
    const [token, setToken] = useState(initToken);

    const userLoggedIn = !!token;
    const caculateTime = (expirationTime) => {
        const nowTime = new Date().getTime();
        const adjExpirT = new Date(
            expirationTime
        ).getTime();
        return adjExpirT - nowTime;
    };
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };
    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainingTime = caculateTime(expirationTime);
        setTimeout(logoutHandler, remainingTime);
    };
    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
