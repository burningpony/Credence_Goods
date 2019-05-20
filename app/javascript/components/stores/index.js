import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import experiment from '../reducers/experiment_reducer';
import user from '../reducers/user_reducer';
import group from '../reducers/group_reducer';
import currentSet from '../reducers/current_set_reducer';

import functions from '../reducers/function_reducer';
import functionSets from '../reducers/function_set_reducer';
import pair from '../reducers/user_pair_reducer';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


export default createStore(
  combineReducers({
    user, experiment, group, currentSet, functionSets, functions, pair,
  }),
  {},
  compose(
    applyMiddleware(thunk),
  ),
);
