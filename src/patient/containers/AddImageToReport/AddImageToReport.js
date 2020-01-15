import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './AddImageToReport.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as createReportActions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class AddImageToReport extends Component{
    state = {
        addImageToReportForm: {
            skin_image: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: 'upload image'
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

    addImageToReportHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.addImageToReportForm){
            formData[formElementIdentifier]=this.state.addImageToReportForm[formElementIdentifier].value;
        }

        this.props.onAddImageToReport(formData, this.props.token);
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
        const updatedAddImageToReportForm = {
            ...this.state.addImageToReportForm
        };
        const updatedFormElement = {
            ...updatedAddImageToReportForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedAddImageToReportForm[inputIdentifier]=updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedAddImageToReportForm ){
            formIsValid = formIsValid && updatedAddImageToReportForm[inputIdentifier].valid
        }
        this.setState({
            addImageToReportForm: updatedAddImageToReportForm,
            formIsValid: formIsValid
        });
    };



    render(){
        const formElementsArray = [];
        for(let key in this.state.addImageToReportForm){
            formElementsArray.push({
                id: key,
                config: this.state.addImageToReportForm[key]
            });
        }
        const createdRedirect = (this.props.created) ? <Redirect to={'/see-report'}/> : null;
        let form = (
                <form onSubmit={this.addImageToReportHandler}>
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
            <div className={classes.AddImageToReport}>
                <h4>Upload your Skin Image</h4>
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