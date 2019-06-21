import { connect } from 'react-redux';
import React from 'react';
import Part1 from '../../components/experiment/part_1';
import { setState } from '../../components/actions/experiment_actions';
import { START_TIMER } from '../../components/actions/user_actions';

const mapDispatchToProps = dispatch => ({
  transition: state => dispatch(setState(state)),
  startTimer: () => dispatch({ type: START_TIMER }),
});

const mapStateToProps = state => ({
  group: state.group.toJS(),
});
export default connect(mapStateToProps, mapDispatchToProps)(Part1);
