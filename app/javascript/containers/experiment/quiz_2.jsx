import { connect } from 'react-redux';
import React from 'react';
import Quiz2 from '../../components/experiment/quiz_2';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('partner_matching')),
});

const mapStateToProps = state => ({
  user: state.user.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz2);
