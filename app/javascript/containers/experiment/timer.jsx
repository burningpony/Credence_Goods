import React,{Component} from 'react';
import { connect } from 'react-redux';
import { setState } from '../../components/actions/experiment_actions';
import { state as getState } from '../../components/selectors/experiment_selectors';
import Timer from '../../components/experiment/timer';

const mapDispatchToProps = dispatch => ({
    transition: (state) => dispatch(setState(state)),
});
  
const mapStateToProps = state => ({
    experimentState: getState(state),
    user: state.user.toJS(),
});

export default connect(mapStateToProps,mapDispatchToProps)(Timer)