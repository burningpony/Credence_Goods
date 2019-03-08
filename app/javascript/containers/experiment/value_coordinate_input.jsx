import ValueCoordinate from '../../components/experiment/value_coordinate_input';
import { connect } from 'react-redux';
import React from 'react';

export const mapDispatchToProps = dispatch => ({
    updateFunctionResponse :  (id,newValueCoordinates) => dispatch({ type:'SAVE_FUNCTION_RESPONSES', id: id, field: "num_bought_value_coordinates", value:newValueCoordinates })

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(ValueCoordinate)