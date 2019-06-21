import { connect } from 'react-redux';
import React from 'react';
import SamplePointsView from '../../components/experiment/sample_points_view';
import { mapDispatchToProps } from './sample_points_input';


const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SamplePointsView);
