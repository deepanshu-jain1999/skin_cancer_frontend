import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportImage from '../../components/SeeReportImage/SeeReportImage';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ReportImages extends Component {
    componentDidMount() {
        this.props.onFetchReportImages(this.props.token);
    }

    render(){
        let reportImages = <Spinner/>;
        if(!this.props.loading){
            console.log('report_image->', this.props.report_images);
            reportImages = this.props.report_images.map(report_image => (
                    <ReportImage key={report_image.id} report_image={report_image}/>
                ))
        }
        return (
            <div>
                {reportImages}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        report_images: state.report_image.report_images,
        loading: state.report_image.loading,
        token: state.login.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchReportImages: (token) => dispatch(actions.fetchReportImages(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ReportImages, axios));