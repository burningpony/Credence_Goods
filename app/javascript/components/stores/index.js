import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import experiment from '../reducers/experiment_reducer';
import user from '../reducers/user_reducer';
import group from '../reducers/group_reducer';
import functions from '../reducers/function_reducer';
import functionSet from '../reducers/function_set_reducer';

//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


export default createStore(
  combineReducers({ user, experiment, group, functionSet,functions }),
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
