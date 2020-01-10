import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Signup.module.css';
import * as actions from '../../../store/actions/index';

class Signup extends  Component{
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        isPatient: true
    };


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler  = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedControls[controlName]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedControls[controlName] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = formIsValid && updatedControls[inputIdentifier].valid
        }
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSignup(this.state.controls.username.value, this.state.controls.email.value, this.state.controls.password.value)
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
            ));

        if(this.props.loading){
            form = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            );
        }

        return (
            <div className={classes.Signup} >
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button className={classes.btn} btnType="Success">Submit</Button>
                </form>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signup.loading,
        error: state.signup.error,
        isAuthenticated: state.login.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignup: (username, email, password, is_patient) => dispatch(actions.signup(username, email, password, is_patient)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);