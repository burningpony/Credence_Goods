import { Map as iMap } from 'immutable';
import { fromJS } from 'immutable';
import {
  RECEIVE_FUNCTIONS, SAVE_FUNCTION_RESPONSES, SET_SAVED_FUNCTION, GET_FUNCTION,
} from '../actions/functions_actions';

export default function functions(state = fromJS([]), action) {
  switch (action.type) {
    case RECEIVE_FUNCTIONS:
      return action.functions;
    case SAVE_FUNCTION_RESPONSES:
      return state.map((func) => {
        if (func.get('id') == action.id) {
          func = func.toJS();
          if (!func.responses) {
            func.responses = {};
          }
          func.responses[action.field] = action.value;
          return fromJS(func);
        } return func;
      });
    case SET_SAVED_FUNCTION:
      return state.map((func) => {
        if (func.get('id') == action.id) {
          func = func.toJS();
          func.responses.response_id = action.responseId;
          func.saved = true;
          return fromJS(func);
        } return func;
      });
    default:
      return state;
  }
}
