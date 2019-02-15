import { Map as iMap } from 'immutable';
import { RECEIVE_FUNCTIONS } from '../actions/functions_actions';
import { RECEIVE_FUNCTION_SET } from '../actions/functions_actions';

export default function functions(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_FUNCTIONS:
      return action.functions;
    default:
      return state;
  }
}

