import Quiz2 from '../../components/experiment/quiz_2';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('part2')),
});

const mapStateToProps = state => ({

}) 

export default connect(mapStateToProps,mapDispatchToProps)(Quiz2)