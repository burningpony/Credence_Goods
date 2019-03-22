import PartnerMatching from '../../components/experiment/partner_matching';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';
import { RECEIVE_USER_PAIR } from '../../components//actions/user_pair_actions';
import {STOP_TIMER} from '../../components/actions/user_actions'

const mapDispatchToProps = dispatch => ({
    transition: (state) => dispatch(setState(state)),
    receivePair: (data) => dispatch({ type: RECEIVE_USER_PAIR, pair: data }),
    stopTimer: () => dispatch({type:STOP_TIMER}),
});

const mapStateToProps = state => ({
    user: state.user.toJS(),
    group: state.group.toJS(),
    pair: state.pair.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(PartnerMatching)