import Part2 from '../../components/experiment/part_2';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
    transition: () => dispatch(setState('finished')),
    setFunctions: (data) =>  dispatch({type:'RECEIVE_FUNCTIONS' , functions:data }),
  });
  
  const mapStateToProps = state => ({
    user: state.user.toJS(),
    pair: state.pair,
    functions: state.functions.toJS()
  })

export default connect(mapStateToProps,mapDispatchToProps)(Part2)