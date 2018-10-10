import { Map as iMap } from 'immutable';
import { RECEIVE_GROUP } from '../actions/group_actions';

export default function user(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.user;
    default:
      return state;
  }
}
