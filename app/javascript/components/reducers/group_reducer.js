import { Map as iMap, fromJS } from 'immutable';
import { RECEIVE_GROUP } from '../actions/group_actions';

export default function group(state = iMap, action) {
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.group;
    default:
      return state;
  }
}
