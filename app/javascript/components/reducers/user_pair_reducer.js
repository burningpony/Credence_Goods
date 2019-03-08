import { Map as iMap } from 'immutable';
import { RECEIVE_USER_PAIR } from '../actions/user_pair_actions';

export default function pair(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER_PAIR:
      return action.pair;
    default:
      return state;
  }
}
