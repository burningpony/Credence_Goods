import { connect } from 'react-redux';
import React from 'react';
import ValueCoordinateView from '../../components/experiment/value_coordinate_view';
import { mapDispatchToProps } from './value_coordinate_input';

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ValueCoordinateView);
