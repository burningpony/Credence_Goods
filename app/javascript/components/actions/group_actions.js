import { fromJS } from 'immutable';
import { API_URL } from '../../service';
import { setState } from './experiment_actions';
import {fetchFunctionSet} from './functions_actions'
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export const receiveGroup = user => ({
  type: RECEIVE_GROUP,
  user,
});

export const fetchGroup = groupId => dispatch => fetch(`${API_URL}/groups/${groupId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}).then(response => response.json()).then((response) => {
  dispatch(receiveGroup(fromJS(response)));
  dispatch(setState('instructions'));
  if (!response.errors) dispatch(fetchFunctionSet(groupId));

});
