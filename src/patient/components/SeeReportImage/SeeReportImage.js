import React from 'react';
import classes from './SeeReportImage.module.css';

const reportImage = (props) => {
    const report_image = props.report_image;
    return (
        <div className={classes.ReportImage}>
            <p>Web opinion: {report_image.web_opinion} </p>
        </div>
    );
};




export default reportImage;