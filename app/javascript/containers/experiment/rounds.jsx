import Rounds from '../../components/experiment/rounds';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';
import { updateUserPair } from '../../components/actions/user_pair_actions';

const mapDispatchToProps = dispatch => ({
  transition: (state) => dispatch(setState(state)),
  updatePairRound:(pairId,data)=> dispatch(updateUserPair(pairId,data))
});

const mapStateToProps = state => ({
    group: state.group.toJS(),
    pair: state.pair.toJS()
});

export default connect(mapStateToProps,mapDispatchToProps)(Rounds)