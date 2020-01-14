import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './CreateReport.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as createReportActions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class CreateReport extends Component{
    state = {
        createReportForm: {
            report_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Report Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    };

    createReportHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.createReportForm){
            formData[formElementIdentifier]=this.state.createReportForm[formElementIdentifier].value;
        }

        this.props.onCreateReport(formData, this.props.token);
    };

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return isValid;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler  = (event, inputIdentifier) => {
        const updatedCreateReportForm = {
            ...this.state.createReportForm
        };
        const updatedFormElement = {
            ...updatedCreateReportForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedCreateReportForm[inputIdentifier]=updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedCreateReportForm ){
            formIsValid = formIsValid && updatedCreateReportForm[inputIdentifier].valid
        }
        this.setState({
            createReportForm: updatedCreateReportForm,
            formIsValid: formIsValid
        });
    };



    render(){
        const formElementsArray = [];
        for(let key in this.state.createReportForm){
            formElementsArray.push({
                id: key,
                config: this.state.createReportForm[key]
            });
        }
        const createdRedirect = (this.props.created) ? <Redirect to={'/see-report'}/> : null;
        let form = (
                <form onSubmit={this.createReportHandler}>
                    {createdRedirect}
                    {formElementsArray.map(formElement => (
                        <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
                        ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Create</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.CreateReport}>
                <h4>Enter your Report Name</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.report.loading,
        created: state.report.created,
        token: state.login.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateReport: (createReportData, token) => dispatch(createReportActions.createReport(createReportData, token))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CreateReport, axios));