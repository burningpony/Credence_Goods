import { connect } from 'react-redux';
import React from 'react';
import PaymentSummaryPart2 from '../../components/experiment/payment_summar_part2';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: state => dispatch(setState(state)),

});
const mapStateToProps = state => ({
  group: state.group.toJS(),
  user: state.user.toJS(),
  functions: state.functions.toJS(),
  pair: state.pair.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummaryPart2);
