import * as actionTypes from './actionTypes';
import axios from 'axios';


export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

// export const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     return {
//         type: actionTypes.SIGNUP_LOGOUT
//     };
// };

export const signup = (username, email, password, isPatient) => {
    return dispatch => {
        dispatch(signupStart());
        const signupData = {
            username: username,
            email: email,
            password: password,
            isPatient: true,
            isDoctor: false
        };
        let url = 'http://api-skin-cancer.herokuapp.com/api/signup/';
        axios.post(url, signupData)
            .then(res => {
                console.log(res);
                dispatch(signupSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(signupFail(err.response.data.error));
            });
    };
};

export const setSignupRedirectPath = (path) => {
    return {
        type: actionTypes.SET_SIGNUP_REDIRECT_PATH,
        path: path
    };
};

export const signupCheckState = () => {
    return dispatch => {
        dispatch(signupSuccess());
    };
};
