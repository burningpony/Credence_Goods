import { fromJS } from 'immutable';
import { API_URL, getToken } from '../../service';
import { fetchGroup } from './group_actions';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const configureUser = groupName => dispatch => fetch(`${API_URL}/users`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': getToken(),
    },
    credentials: 'same-origin',
    body: JSON.stringify({ group_name: groupName }),
  }).then(response => response.json()).then((response) => {
  dispatch(receiveUser(fromJS(response)));
  if (!response.errors) dispatch(fetchGroup(response.group_id));
});
