import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


class Profile extends Component{

    render(){
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        profileData: state.profile.profileData,
        loading: state.profile.loading,
        token: state.login.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Profile, axios));