import { Map as iMap, fromJS } from 'immutable';
import { SET_CURRENT_FUNCTION_SET } from '../actions/functions_actions';

export default function set(state = fromJS({}), action) {
  switch (action.type) {
    case SET_CURRENT_FUNCTION_SET:
      return action.currentSet;
    default:
      return state;
  }
}
