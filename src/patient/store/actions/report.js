import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

export const fetchReportsSuccess = (reports) => {
    return {
        type: actionTypes.FETCH_REPORTS_SUCCESS,
        reports: reports
    };
};

export const fetchReportsFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORTS_FAIL,
        error: error
    };
};

export const fetchReportsStart = () => {
    return {
        type: actionTypes.FETCH_REPORTS_START
    };
};

export const fetchReports = (token) => {

    return dispatch => {
        dispatch(fetchReportsStart());
        let headers = {
            "Content-Type": "application/json",
        };
        headers["Authorization"] = `Token ${token}`;
        console.log(token);
        axios.get('http://localhost:8000/api/report.json', {headers, })
            .then(res => {
                dispatch(fetchReportsSuccess(res.data));
        })
            .catch(err => {
                dispatch(fetchReportsFail(err));
        });
    };

};


export const createReportSuccess = (reportData) => {
    return {
        type: actionTypes.CREATE_REPORT_SUCCESS,
        createReportData: reportData
    };
};

export const createReportFail = (error) => {
    return {
        type: actionTypes.CREATE_REPORT_FAIL,
        error: error
    };
};

export const createReportStart = () => {
    return {
        type: actionTypes.CREATE_REPORT_START,
    };
};

export const createReportInit = () => {
    return {
        type: actionTypes.CREATE_REPORT_INIT,
    };
};

export const createReport = (reportData, token) => {
    return dispatch => {
         dispatch(createReportStart());
         let headers = {
            "Content-Type": "application/json",
         };
         headers["Authorization"] = `Token ${token}`;
         axios.post('http://localhost:8000/api/report.json', reportData, {headers: headers})
             .then(response => {
                 dispatch(createReportSuccess(response.data))
             })
             .catch(error => {
                 dispatch(createReportFail(error))
             })
    };
};
