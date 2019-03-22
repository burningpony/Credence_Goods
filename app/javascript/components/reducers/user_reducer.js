import { Map as iMap ,fromJS} from 'immutable';
import { RECEIVE_USER,START_TIMER, STOP_TIMER } from '../actions/user_actions';

export default function user(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case START_TIMER :
      const settedUser = state.toJS()
      settedUser.timer = true
      return fromJS(settedUser);
    case STOP_TIMER :
      const settedUser2 = state.toJS()
      settedUser2.timer = false
      return fromJS(settedUser2);
    default:
      return state;
  }
}
