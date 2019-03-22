import Quiz1 from '../../components/experiment/quiz_1';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('sets')),
});

const mapStateToProps = state => ({
  user:state.user.toJS()
}) 

export default connect(mapStateToProps,mapDispatchToProps)(Quiz1)