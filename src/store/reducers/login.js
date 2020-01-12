import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    token: null,
    error: null,
    loading: false,
    loginRedirectPath: '/'
};

const loginStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false});
};

const loginFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
};

const loginLogout = (state, action) => {
    return  updateObject(state, {token: null, userId: null});
};

const setLoginRedirectPath = (state, action) => {
    return updateObject(state, {loginRedirectPath: action.path});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.LOGIN_LOGOUT:
            return loginLogout(state, action);
        case actionTypes.SET_LOGIN_REDIRECT_PATH:
            return setLoginRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;