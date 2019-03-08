import { fromJS } from 'immutable';
export const RECEIVE_USER_PAIR = 'RECEIVE_USER_PAIR';

export const receiveUser = pair => ({
  type: RECEIVE_USER_PAIR,
  pair,
});
