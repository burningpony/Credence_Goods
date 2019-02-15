import { fromJS } from 'immutable';
import { API_URL } from '../../service';
import { setState } from './experiment_actions';

export const RECEIVE_FUNCTIONS = 'RECEIVE_FUNCTIONS';
export const RECEIVE_FUNCTION_SET = 'RECEIVE_FUNCTION_SET';
export const SAVE_FUNCTION_RESPONSES = 'SAVE_RECEIVE_FUNCTIONS';

export const receiveFunctions = functions => ({
  type: RECEIVE_FUNCTIONS,
  functions,
});

export const receiveFunctionSet = sets => ({
  type: RECEIVE_FUNCTION_SET,
  sets,
});

export const saveFunctionResponses = user => ({
  type: SAVE_FUNCTION_RESPONSES,
  user,
});

export const fetchFunctionSet = groupId => dispatch => fetch(`${API_URL}/groups/${groupId}/function_sets`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}).then(response => response.json()).then((response) => {
  console.log(response)
  dispatch(receiveFunctionSet(fromJS(response)));
  if (!response.errors) dispatch(fetchFunctions(response.group_id,response.id));

});

export const fetchFunctions = (groupId,setId) => dispatch => fetch(`${API_URL}/groups/${groupId}/function_sets/${setId}/functions`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}).then(response => response.json()).then((response) => {
  dispatch(receiveFunctions(fromJS(response)));
});

export const storeFunctionResponses = functionsResponses => dispatch => fetch(`${API_URL}/functions/${functionsId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}).then(response => response.json()).then((response) => {
  dispatch(receiveFunctions(fromJS(response)));
});