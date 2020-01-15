import React, { Component } from 'react';
import classes from './PatientHome.module.css';
import {Link} from 'react-router-dom';

class PatientHome extends Component {
    // componentDidMount() {
    //
    // }

    render(){
        return (
            <div className={classes.GridContainer}>
                <Link to="/see-report">
                     <div>See All Reports</div>
                </Link>
                <Link to="/create-report">
                     <div>Create Report</div>
                </Link>
                <Link to="/report-images">
                     <div>See All Appointments</div>
                </Link>
                <Link to="/home">
                     <div>Create Appointment</div>
                </Link>
            </div>
        );
    }
}

export default PatientHome;