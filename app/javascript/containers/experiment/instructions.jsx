import Instructions from '../../components/experiment/instructions';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('part1')),
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(Instructions)