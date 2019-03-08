import PartnerMatching from '../../components/experiment/partner_matching';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';
import { RECEIVE_USER_PAIR } from '../../components//actions/user_pair_actions';

const mapDispatchToProps = dispatch => ({
    transition: (state) => dispatch(setState(state)),
    receivePair: (data) => dispatch({ type: RECEIVE_USER_PAIR, pair: { ...data } })
});

const mapStateToProps = state => ({
    user: state.user.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(PartnerMatching)