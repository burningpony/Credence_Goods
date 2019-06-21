import { connect } from 'react-redux';
import React from 'react';
import ValueCoordinate from '../../components/experiment/value_coordinate_input';

export const mapDispatchToProps = dispatch => ({
  updateFunctionResponse: (id, newValueCoordinates) => dispatch({
    type: 'SAVE_FUNCTION_RESPONSES', id, field: 'num_bought_value_coordinates', value: newValueCoordinates,
  }),

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ValueCoordinate);
