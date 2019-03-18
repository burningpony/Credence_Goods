import { Map as iMap ,fromJS} from 'immutable';
import { RECEIVE_USER,START_PART_1,START_PART_2 } from '../actions/user_actions';

export default function user(state = iMap(), action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case START_PART_1 :
      const settedUser = state.toJS()
      settedUser.part_1_start = true
      return fromJS(settedUser);
    case START_PART_2 :
      const settedUser2 = state.toJS()
      settedUser2.part_2_start = true
      return fromJS(settedUser2);
    default:
      return state;
  }
}
