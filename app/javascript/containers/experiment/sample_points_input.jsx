import SamplePointsInput from '../../components/experiment/sample_points_input';
import { connect } from 'react-redux';
import React from 'react';

export const mapDispatchToProps = dispatch => ({
    updateFunctionResponse : (id,newSamplePoints) => dispatch({ type:'SAVE_FUNCTION_RESPONSES', id: id, field: "num_bought_sample_points", value:newSamplePoints })
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(SamplePointsInput)