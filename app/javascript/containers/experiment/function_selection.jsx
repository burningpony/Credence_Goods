import FunctionSelection from '../../components/experiment/functions_selection';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

export const mapDispatchToProps = dispatch => ({
  
});

const mapStateToProps = state => ({
  mathFunctions: state.functions.toJS()
});

export default connect(mapStateToProps,mapDispatchToProps)(FunctionSelection)