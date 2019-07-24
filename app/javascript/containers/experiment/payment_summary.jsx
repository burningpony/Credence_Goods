import { connect } from 'react-redux';
import React from 'react';
import PaymentSummary from '../../components/experiment/payment_summary';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: state => dispatch(setState(state)),

});
const mapStateToProps = state => ({
  group: state.group.toJS(),
  user: state.user.toJS(),
  functions: state.functions.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary);
