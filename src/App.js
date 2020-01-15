import React, { Component } from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth';
import PatientHome from './patient/containers/Home/PatientHome';
import CreateReport from "./patient/containers/CreateReport/CreateReport";
import SeeReports from "./patient/containers/SeeReports/SeeReports";
import SeeReportImages from "./patient/containers/SeeReportImages/SeeReportImages";
import Logout from "./containers/Auth/Logout/Logout";
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Redirect to="/" />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    {/*<Route path="/checkout" component={Checkout}/>*/}
                    {/*<Route path="/orders" component={Orders}/>*/}
                    <Route path="/logout" component={Logout}/>
                    <Route path="/report-images" component={SeeReportImages}/>
                    <Route path="/see-report" exact component={SeeReports}/>
                    <Route path="/create-report" exact component={CreateReport}/>
                    <Route path="/see-appointments" exact component={SeeReportImages}/>
                    <Route path="/create-appointment" exact component={PatientHome}/>
                    <Route path="/" exact component={PatientHome}/>
                    <Redirect to="/" />
                </Switch>
            );
        }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapPropsToState = state => {
    return {
        isAuthenticated: state.login.token !== null
    };
};

const mapDispatchToState = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.loginCheckState())
    };
};

export default connect(mapPropsToState, mapDispatchToState)(App);
