// import React, { Component} from 'react';
// import { connect } from 'react-redux';
// import Button from '../../../../components/UI/Button/Button';
// import classes from './Profile.module.css';
// import axios from '../../../../axios-orders';
// import Spinner from '../../../../components/UI/Spinner/Spinner'
// import Input from '../../../../components/UI/Input/Input';
// import withErrorHandler from "../../../../hoc/WithErrorHandler/WithErrorHandler";
// import * as orderActions from '../../../../store/actions';
//
// class Profile extends Component{
//     state = {
//         updateProfileForm: {
//             photo: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'file',
//                     placeholder: 'Your profile pic'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             date_of_birth: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'DD/MM/YYYY'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             city: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Your City'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//
//             gender: {
//                 elementType: 'select',
//                 elementConfig: {
//                     options: [
//                         {value: '1', displayValue: 'Male'},
//                         {value: '2', displayValue: 'Female'},
//                         {value: '3', displayValue: 'Other'}
//                     ]
//                 },
//                 value: 'fastest',
//                 validation: {},
//                 valid: true,
//                 touched: false
//             }
//         },
//         formIsValid: false,
//         loading: false
//     };
//     updateProfileHandler = (event) => {
//         event.preventDefault();
//         const formData = {};
//         for(let formElementIdentifier in this.state.updateProfileForm){
//             formData[formElementIdentifier]=this.state.updateProfileForm[formElementIdentifier].value;
//         }
//         const order = {
//             ingredients: this.props.ings,
//             price: this.props.price,
//             orderData: formData,
//             userId: this.props.userId
//         };
//         this.props.onOrderBurger(order, this.props.token);
//     };
//
//     checkValidity(value, rules){
//         let isValid = true;
//         if(!rules){
//             return isValid;
//         }
//         if(rules.required){
//             isValid = value.trim() !== '' && isValid;
//         }
//         if(rules.minLength){
//             isValid = value.length >= rules.minLength && isValid;
//         }
//         if(rules.maxLength){
//             isValid = value.length <= rules.maxLength && isValid;
//         }
//         return isValid;
//     }
//
//     inputChangedHandler  = (event, inputIdentifier) => {
//         const updatedOrderForm = {
//             ...this.state.orderForm
//         };
//         const updatedFormElement = {
//             ...updatedOrderForm[inputIdentifier]
//         };
//         updatedFormElement.value=event.target.value;
//         updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
//         updatedFormElement.touched = true;
//         updatedOrderForm[inputIdentifier]=updatedFormElement;
//         let formIsValid = true;
//         for(let inputIdentifier in updatedOrderForm ){
//             formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid
//         }
//         this.setState({
//             orderForm: updatedOrderForm,
//             formIsValid: formIsValid
//         });
//     };
//
//
//
//     render(){
//         const formElementsArray = [];
//         for(let key in this.state.orderForm){
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.orderForm[key]
//             });
//         }
//         let form = (
//                 <form onSubmit={this.orderHandler}>
//                     {formElementsArray.map(formElement => (
//                         <Input
//                         key={formElement.id}
//                         elementType={formElement.config.elementType}
//                         elementConfig={formElement.config.elementConfig}
//                         value={formElement.config.value}
//                         invalid={!formElement.config.valid}
//                         shouldValidate={formElement.config.validation}
//                         touched={formElement.config.touched}
//                         changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
//                         ))}
//                     <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
//                 </form>
//         );
//         if(this.props.loading){
//             form = <Spinner/>;
//         }
//         return (
//             <div className={classes.ContactData}>
//                 <h4>Enter your contact data</h4>
//                 {form}
//             </div>
//         )
//     }
// }
//
// const mapStateToProps = state => {
//     return {
//         profileData: state.profile.profileData,
//         loading: state.profile.loading,
//         token: state.login.token,
//     }
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
//     };
//
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Profile, axios));