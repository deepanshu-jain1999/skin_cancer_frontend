import React from 'react';
import classes from './SeeReport.module.css';

const report = (props) => {
    const report_name = props.report_name;

    const assignDoctors = props.assign_doctors;

    return (
        <div className={classes.Report}>
            <p>Report Name: {report_name} </p>
            {/*<p>Assign Doctors: {assignDoctors}</p>*/}
        </div>
    );
};




export default report;