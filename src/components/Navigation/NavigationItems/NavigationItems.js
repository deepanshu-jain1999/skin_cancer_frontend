import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/profile">Profile</NavigationItem> : null }
        { props.isAuthenticated ?
            <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        }

    </ul>
);

export default navigationItems;