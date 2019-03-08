import FunctionGraph from '../../components/experiment/function_graph';
import { connect } from 'react-redux';
import React from 'react';
import {storeFunctionResponses,updateFunctionResponses, GET_FUNCTION} from '../../components/actions/functions_actions'

const mapStateToProps = state => ({
  group: state.group.toJS(),
  user: state.user.toJS(),
  functions: state.functions.toJS(),
});

const mapDispatchToProps = dispatch => ({
  storeResponse: (groupId,setId,functionId,functionsResponses) => dispatch(storeFunctionResponses(groupId,setId,functionId,functionsResponses)),
  updateResponse: (groupId,setId,functionId,responseId,functionsResponses) => dispatch(updateFunctionResponses(groupId,setId,functionId,responseId,functionsResponses)),
});

export default connect(mapStateToProps,mapDispatchToProps)(FunctionGraph)