import Instructions from '../../components/experiment/instructions';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('test')),
});

const mapStateToProps = state => ({
  user: state.user.toJS()
});

export default connect(mapStateToProps,mapDispatchToProps)(Instructions)