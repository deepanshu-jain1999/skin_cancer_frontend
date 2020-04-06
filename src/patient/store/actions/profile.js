import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

export const fetchProfileSuccess = (profileData) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profileData: profileData
    };
};

export const fetchProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        error: error
    };
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    };
};

export const fetchProfile = (token) => {

    return dispatch => {
        dispatch(fetchProfileStart());
        let headers = {
            "Content-Type": "application/json",
        };
        headers["Authorization"] = `Token ${token}`;
        console.log(token);
        axios.get('http://api-skin-cancer.herokuapp.com/api/profile/?format=json', {headers, })
            .then(res => {
                console.log("profile=="+res.data.city);
                dispatch(fetchProfileSuccess(res.data));
        })
            .catch(err => {
                dispatch(fetchProfileFail(err));
        });
    };

};


export const updateProfileSuccess = (profileData) => {
    return {
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        profileData: profileData
    };
};

export const updateProfileFail = (error) => {
    return {
        type: actionTypes.UPDATE_PROFILE_FAIL,
        error: error
    };
};

export const updateProfileStart = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_START,
    };
};

export const updateProfileInit = () => {
    return {
        type: actionTypes.UPDATE_PROFILE_INIT,
    };
};

export const updateProfile = (profileData, token) => {
    return dispatch => {
         dispatch(updateProfileStart());
         let headers = {
            "Content-Type": "application/json",
         };
         headers["Authorization"] = `Token ${token}`;
         axios.put('http://api-skin-cancer.herokuapp.com/api/profile', profileData, {headers: headers})
             .then(response => {
                 dispatch(updateProfileSuccess(response.data))
             })
             .catch(error => {
                 dispatch(updateProfileFail(error))
             })
    };
};
