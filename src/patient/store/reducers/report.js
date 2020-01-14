import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    reports: [],
    loading: false,
    created: false
};

const fetchReportsStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchReportsSuccess = (state, action) => {
    return updateObject(state, {reports: action.reports, loading: false});
};

const fetchReportsFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const createReportInit = (state, action) => {
    return updateObject(state, {created: false});
};

const createReportStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const createReportSuccess = (state, action) => {
    const newReport = action.createReportData;
    console.log("newReport->", newReport);
    return updateObject(state, {
        reports: state.reports,
        created: true,
        loading: false});
};

const createReportFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_REPORTS_START:
            return fetchReportsStart(state, action);

        case actionTypes.FETCH_REPORTS_SUCCESS:
            return fetchReportsSuccess(state, action);

        case actionTypes.FETCH_REPORTS_FAIL:
            return fetchReportsFail(state, action);

        case actionTypes.CREATE_REPORT_INIT:
            return createReportInit(state, action);

        case actionTypes.CREATE_REPORT_START:
            return createReportStart(state, action);

        case actionTypes.CREATE_REPORT_SUCCESS:
            return createReportSuccess(state, action);

        case actionTypes.CREATE_REPORT_FAIL:
            return createReportFail(state, action);

        default:
            return state;
    }
};

export default reducer;