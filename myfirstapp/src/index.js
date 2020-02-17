import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose,combineReducers } from 'redux'
import {Provider} from 'react-redux'
import {authReducer} from './Reducers/AuthReducer'
import thunk from 'redux-thunk'

const masterReducer = combineReducers({
	auth:authReducer
})


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const mystore=createStore(masterReducer,composeEnhancers(applyMiddleware(thunk)));


//const mystore = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={mystore}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
