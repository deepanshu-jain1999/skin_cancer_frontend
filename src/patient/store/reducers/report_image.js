import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    report: [],
    report_images: [],
    loading: false,
    created: false
};

const fetchReportImagesStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchReportImagesSuccess = (state, action) => {
    console.log("newReport->", action.reportImages);
    return updateObject(state, {report_image: action.reportImages, loading: false});
};

const fetchReportImagesFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const createReportImageInit = (state, action) => {
    return updateObject(state, {created: false});
};

const createReportImageStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const createReportImageSuccess = (state, action) => {
    const newReportImage = action.createReportImageData;
    console.log("newReport->", newReportImage);
    return updateObject(state, {
        reports: state.report_image,
        created: true,
        loading: false});
};

const createReportImageFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_REPORT_IMAGES_START:
            return fetchReportImagesStart(state, action);

        case actionTypes.FETCH_REPORT_IMAGES_SUCCESS:
            return fetchReportImagesSuccess(state, action);

        case actionTypes.FETCH_REPORT_IMAGES_FAIL:
            return fetchReportImagesFail(state, action);

        case actionTypes.CREATE_REPORT_IMAGE_INIT:
            return createReportImageInit(state, action);

        case actionTypes.CREATE_REPORT_IMAGE_START:
            return createReportImageStart(state, action);

        case actionTypes.CREATE_REPORT_IMAGE_SUCCESS:
            return createReportImageSuccess(state, action);

        case actionTypes.CREATE_REPORT_IMAGE_FAIL:
            return createReportImageFail(state, action);

        default:
            return state;
    }
};

export default reducer;