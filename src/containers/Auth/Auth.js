import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Login from './Login/Login';
import Signup from './Signup/Signup';
import './Auth.module.css';
import * as actions from '../../store/actions/index';
import classes from "./Login/Login.module.css";
import Button from "../../components/UI/Button/Button";

class Auth extends  Component{
    state = {
        isLoginOpen: true,
        isRegisterOpen: false
    };

    componentDidMount() {
        if(this.props.signupRedirectPath !== '/'){
            this.props.onSetSignupRedirectPath();
        }
    }
    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }
    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }
    render() {
        let authRedirect = null;
        if(this.props.isAuthenticated) {
             authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (

            <div className="box-controller">
                {authRedirect}
                <div className={"controller " + (this.state.isLoginOpen? "selected-controller": "")}
                     onClick={this.showLoginBox.bind(this)}>
                     <Login/>
                </div>
                <div className={"controller " + (this.state.isRegisterOpen? "selected-controller": "")}
                     onClick={this.showRegisterBox.bind(this)}>
                     <Signup/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.token !== null,
        authRedirectPath: state.signup.signupRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetSignupRedirectPath: () => dispatch(actions.setSignupRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
