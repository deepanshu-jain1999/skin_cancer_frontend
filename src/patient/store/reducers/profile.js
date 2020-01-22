import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    profileData: '',
    loading: false,
    updated: false
};

const fetchProfileStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {reports: action.profileData, loading: false});
};

const fetchProfileFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const updateProfileInit = (state, action) => {
    return updateObject(state, {updated: false});
};

const updateProfileStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const updateProfileSuccess = (state, action) => {
    const profileData = action.profileData;
    console.log("profileData->", profileData);
    return updateObject(state, {
        profileData: profileData,
        updated: true,
        loading: false});
};

const updateProfileFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_REPORTS_START:
            return fetchProfileStart(state, action);

        case actionTypes.FETCH_REPORTS_SUCCESS:
            return fetchProfileSuccess(state, action);

        case actionTypes.FETCH_REPORTS_FAIL:
            return fetchProfileFail(state, action);

        case actionTypes.CREATE_REPORT_INIT:
            return updateProfileInit(state, action);

        case actionTypes.CREATE_REPORT_START:
            return updateProfileStart(state, action);

        case actionTypes.CREATE_REPORT_SUCCESS:
            return updateProfileSuccess(state, action);

        case actionTypes.CREATE_REPORT_FAIL:
            return updateProfileFail(state, action);

        default:
            return state;
    }
};

export default reducer;