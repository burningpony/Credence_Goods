import Part2 from '../../components/experiment/part_2';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';
import {START_TIMER} from '../../components/actions/user_actions'

const mapDispatchToProps = dispatch => ({
    transition: (state) => dispatch(setState(state)),
    setFunctions: (data) =>  dispatch({type:'RECEIVE_FUNCTIONS' , functions:data }),
    startTimer: () => dispatch({type:START_TIMER}),

  });
  
  const mapStateToProps = state => ({
    group : state.group.toJS(),
    user: state.user.toJS(),
    pair: state.pair.toJS(),
    functions: state.functions.toJS()
  })

export default connect(mapStateToProps,mapDispatchToProps)(Part2)