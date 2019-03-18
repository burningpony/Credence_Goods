import { Map as iMap,fromJS } from 'immutable';
import { RECEIVE_USER_PAIR } from '../actions/user_pair_actions';

export default function pair(state = fromJS({part:1}), action) {
  switch (action.type) {
    case RECEIVE_USER_PAIR:
      return action.pair;
    default:
      return state;
  }
}
