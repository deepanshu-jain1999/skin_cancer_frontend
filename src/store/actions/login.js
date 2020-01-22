import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.LOGIN_LOGOUT
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        const loginData = {
            username: email,
            password: password,
        };
        let url = 'http://localhost:8000/api/login/';
        axios.post(url, loginData)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                dispatch(loginSuccess(res.data.token));
            })
            .catch(err => {
                console.log(err);
                dispatch(loginFail(err.response.data.error));
            });
    };
};

export const setLoginRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    };
};

export const loginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else{
            const userId = localStorage.getItem('userId');
            dispatch(loginSuccess(token, userId));
        }
    };
};