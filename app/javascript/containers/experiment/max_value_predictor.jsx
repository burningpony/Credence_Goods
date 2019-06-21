import { connect } from 'react-redux';
import React from 'react';
import MaxValuePrediction from '../../components/experiment/max_value_predictor';

const mapDispatchToProps = dispatch => ({
  setResponse: (id, value) => dispatch({
    type: 'SAVE_FUNCTION_RESPONSES', id, field: 'max_value_prediction', value: parseFloat(value),
  }),
});


const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MaxValuePrediction);
