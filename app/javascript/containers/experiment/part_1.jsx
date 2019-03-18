import Part1 from '../../components/experiment/part_1';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';
import {START_PART_1} from '../../components/actions/user_actions'
const mapDispatchToProps = dispatch => ({
  transition: (state) => dispatch(setState(state)),
  startTimer: () => dispatch({type:START_PART_1}),
});

const mapStateToProps = state => ({
    group : state.group.toJS()
});
export default connect(mapStateToProps,mapDispatchToProps)(Part1)