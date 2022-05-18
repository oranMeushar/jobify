import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {

    const {isAuth} = useSelector(state => state.auth);
    return (
        isAuth ? children : <Navigate to='/register' />
    );
};

export default PrivateRoute;