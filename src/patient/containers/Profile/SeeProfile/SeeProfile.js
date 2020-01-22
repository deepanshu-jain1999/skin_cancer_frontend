import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../../axios-orders';
import withErrorHandler from '../../../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Profile from '../../../components/Profile/Profile';
import * as actions from "../../../store/actions";

class SeeProfile extends Component {
    componentDidMount() {
        this.props.onFetchProfile(this.props.token);
    }

    render(){
        let profile = <Spinner/>;
        console.log('profile->', this.props.profileData);

        if(!this.props.loading){
            profile = <Profile data={this.props.profileData}/>
        }
        return (
            <div>
                {profile}
            </div>
        );
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
        onFetchProfile: (token) => dispatch(actions.fetchProfile(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SeeProfile, axios));