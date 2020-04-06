import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';
import reportImage from "../../components/SeeReportImage/SeeReportImage";

export const createReportImageSuccess = (reportImagesData) => {
    return {
        type: actionTypes.CREATE_REPORT_IMAGE_SUCCESS,
        createReportImageData: reportImagesData
    };
};

export const createReportImageFail = (error) => {
    return {
        type: actionTypes.CREATE_REPORT_IMAGE_FAIL,
        error: error
    };
};

export const createReportImageStart = () => {
    return {
        type: actionTypes.CREATE_REPORT_IMAGE_START,
    };
};

export const createReportImageInit = () => {
    return {
        type: actionTypes.CREATE_REPORT_IMAGE_INIT,
    };
};

export const createReportImage = (reportImageData, token) => {
    return dispatch => {
         dispatch(createReportImageStart());
         let headers = {
            "Content-Type": "application/json",
         };
         headers["Authorization"] = `Token ${token}`;
         axios.post('http://api-skin-cancer.herokuapp.com/api/report.json', reportImageData, {headers: headers})
             .then(response => {
                 dispatch(createReportImageSuccess(response.data))
             })
             .catch(error => {
                 dispatch(createReportImageFail(error))
             })
    };
};

export const fetchReportImagesSuccess = (reportImages) => {
    return {
        type: actionTypes.FETCH_REPORT_IMAGES_SUCCESS,
        reportImages: reportImages
    };
};

export const fetchReportImagesFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_IMAGES_FAIL,
        error: error
    };
};

export const fetchReportImagesStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_IMAGES_START
    };
};

export const fetchReportImages = (token) => {

    return dispatch => {
        dispatch(fetchReportImagesStart());
        let headers = {
            "Content-Type": "application/json",
        };
        headers["Authorization"] = `Token ${token}`;
        console.log(token);
        axios.get('http://api-skin-cancer.herokuapp.com/api/report-images.json', {headers, })
            .then(res => {
                console.log(res.data);
                dispatch(fetchReportImagesSuccess(res.data));
        })
            .catch(err => {
                dispatch(fetchReportImagesFail(err));
        });
    };

};
