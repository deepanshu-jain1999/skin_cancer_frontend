import React from 'react';
import classes from './Profile.module.css';

const profile = (props) => {
    const city = props.data.city;
    const gender = props.data.gender;

    return (
        <div className={classes.Profile}>
            <p>Gender: {gender} </p>
            <p>city: {city} </p>

        </div>
    );
};

export default profile;