import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.module.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import signupReducer from './store/reducers/signup';
import loginReducer from './store/reducers/login';
import reportReducer from './patient/store/reducers/report';
import reportImageReducer from './patient/store/reducers/report_image';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    report: reportReducer,
    report_image: reportImageReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
