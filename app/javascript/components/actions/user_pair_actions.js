import { fromJS } from 'immutable';

import { API_URL, getToken } from '../../service';

export const RECEIVE_USER_PAIR = 'RECEIVE_USER_PAIR';
export const UPDATE_ROUND = 'UPDATE_ROUND';

export const receiveUser = pair => ({
  type: RECEIVE_USER_PAIR,
  pair,
});

export const updateUserPair = (id, data) => dispatch => fetch(`${API_URL}/user_pairs/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getToken(),
  },
}).then(response => response.json()).then((response) => {
  dispatch({ type: UPDATE_ROUND });
});

export const finishExperiment = (userId) => 
  fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': getToken(),
    },
}).then(response => response.json());