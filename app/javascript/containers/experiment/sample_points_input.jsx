import { connect } from 'react-redux';
import React from 'react';
import SamplePointsInput from '../../components/experiment/sample_points_input';

export const mapDispatchToProps = dispatch => ({
  updateFunctionResponse: (id, newSamplePoints) => dispatch({
    type: 'SAVE_FUNCTION_RESPONSES', id, field: 'num_bought_sample_points', value: newSamplePoints,
  }),
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SamplePointsInput);
