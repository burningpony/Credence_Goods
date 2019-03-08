import Part1 from '../../components/experiment/part_1';
import { connect } from 'react-redux';
import React from 'react';
import { setState } from '../../components/actions/experiment_actions';

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('partner_matching')),
});

const mapStateToProps = state => ({

});
export default connect(mapStateToProps,mapDispatchToProps)(Part1)