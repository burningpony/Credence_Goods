import { Map as iMap } from 'immutable';
import { SET_STATE } from '../actions/experiment_actions';

export default function experiment(state = iMap(), action) {
  switch (action.type) {
    case SET_STATE:
      return state.set('state', action.state);
    default:
      return state;
  }
}
