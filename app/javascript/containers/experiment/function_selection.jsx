import { connect } from 'react-redux';
import React from 'react';
import FunctionSelection from '../../components/experiment/functions_selection';
import { setState } from '../../components/actions/experiment_actions';
import { fetchFunctionSet } from '../../components/actions/functions_actions';

export const mapDispatchToProps = dispatch => ({
  fetchFunctions: groupId => dispatch(fetchFunctionSet(groupId)),
});

const mapStateToProps = state => ({
  mathFunctions: state.functions.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(FunctionSelection);
