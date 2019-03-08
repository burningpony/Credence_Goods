import { fromJS } from 'immutable';
import { API_URL , getToken} from '../../service';
import { setState } from './experiment_actions';

export const RECEIVE_FUNCTIONS = 'RECEIVE_FUNCTIONS';
export const RECEIVE_FUNCTION_SET = 'RECEIVE_FUNCTION_SET';
export const SAVE_FUNCTION_RESPONSES = 'SAVE_FUNCTION_RESPONSES';
export const SET_SAVED_FUNCTION = 'SET_SAVED_FUNCTION';
export const GET_FUNCTION = 'GET_FUNCTION';

export const receiveFunctions = functions => ({
  type: RECEIVE_FUNCTIONS,
  functions,
});

export const receiveFunctionSet = sets => ({
  type: RECEIVE_FUNCTION_SET,
  sets,
});

//export const saveFunctionResponses = response => ({
//  type: SAVE_FUNCTION_RESPONSES,
//  response,
//});

export const fetchFunctionSet = groupId => dispatch => fetch(`${API_URL}/groups/${groupId}/function_sets`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}).then(response => response.json()).then((response) => {
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
  response = response.map((func)=>{
    func.responses = {}
    return func
  })
  dispatch(receiveFunctions(fromJS(response)));
});

export const storeFunctionResponses = (groupId,setId,functionId,functionsResponses) => dispatch => fetch(`${API_URL}/groups/${groupId}/function_sets/${setId}/functions/${functionId}/function_responses`, {
  method: 'POST',
  body: JSON.stringify(functionsResponses),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getToken(),
  },
}).then(response => response.json()).then((response) => {
  if (!response.errors) dispatch({type:'SET_SAVED_FUNCTION',id:functionId,responseId:response.id})
});

export const updateFunctionResponses = (groupId,setId,functionId,responseId,functionsResponses) => dispatch => fetch(`${API_URL}/groups/${groupId}/function_sets/${setId}/functions/${functionId}/function_responses/${responseId}`, {
  method: 'PUT',
  body: JSON.stringify(functionsResponses),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getToken(),
  },
}).then(response => response.json()).then((response) => {

});