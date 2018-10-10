import { Map as iMap } from 'immutable';
import { RECEIVE_USER } from '../actions/user_actions';

export default function user(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
}
