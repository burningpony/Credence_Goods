import { Map as iMap } from 'immutable';
import { RECEIVE_FUNCTIONS } from '../actions/functions_actions';
import { RECEIVE_FUNCTION_SET } from '../actions/functions_actions';

export default function sets(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_FUNCTION_SET:
      return action.sets;
    default:
      return state;
  }
}
