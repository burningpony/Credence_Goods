import { connect } from 'react-redux';
import React from 'react';
import TestFunctions from '../../components/experiment/test_functions';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('sets')),
});

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(TestFunctions);
