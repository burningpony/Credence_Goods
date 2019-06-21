import { connect } from 'react-redux';
import React from 'react';
import Rounds from '../../components/experiment/rounds';
import { setState } from '../../components/actions/experiment_actions';
import { updateUserPair } from '../../components/actions/user_pair_actions';
import { STOP_TIMER } from '../../components/actions/user_actions';

const mapDispatchToProps = dispatch => ({
  transition: state => dispatch(setState(state)),
  updatePairRound: (pairId, data) => dispatch(updateUserPair(pairId, data)),
  stopTimer: () => dispatch({ type: STOP_TIMER }),
});

const mapStateToProps = state => ({
  group: state.group.toJS(),
  pair: state.pair.toJS(),
  user: state.user.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rounds);
