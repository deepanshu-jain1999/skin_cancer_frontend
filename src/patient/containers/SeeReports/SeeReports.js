import React, { Component } from 'react';
import { connect } from 'react-redux';
import Report from '../../components/SeeReport/SeeReport';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from '../../../components/UI/Spinner/Spinner';

class Reports extends Component {
    componentDidMount() {
        this.props.onFetchReports(this.props.token);
    }

    render(){
        let reports = <Spinner/>;
        console.log('reports->', this.props.reports);

        if(!this.props.loading){
            reports = this.props.reports.map(report => (
                    <Report key={report.id} report_name={report.report_name} assign_doctors={report.assign_doctors}/>
                ))
        }
        return (
            <div>
                {reports}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reports: state.report.reports,
        loading: state.report.loading,
        token: state.login.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchReports: (token) => dispatch(actions.fetchReports(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Reports, axios));