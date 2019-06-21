import { Map as iMap, fromJS } from 'immutable';
import { RECEIVE_FUNCTION_SET, MARK_AS_SELECTED } from '../actions/functions_actions';

export default function sets(state = fromJS([]), action) {
  switch (action.type) {
    case MARK_AS_SELECTED:
      return state.map((set) => {
        if (set.get('id') == action.id) {
          set = set.toJS();
          set.selected = true;
          return fromJS(set);
        } return set;
      });
    case RECEIVE_FUNCTION_SET:
      return action.sets;
    default:
      return state;
  }
}
