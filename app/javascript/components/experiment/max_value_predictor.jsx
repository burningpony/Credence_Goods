import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';
import { connect } from 'react-redux';
//import 
class MaxValuePrediction extends Component {
  static propTypes() {
    return {
      id:PropTypes.function.isRequired,//function_id
      functionId: PropTypes.string.isRequired,
      updateMaxValueEstimate: PropTypes.string.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      maxValue: null,
    };
  }

  
  setMaxValue = (e) => {
    this.props.dispatch({ type:'SAVE_FUNCTION_RESPONSES', id: this.props.id, field: "max_value_prediction", value:parseFloat(e.target.value) })
    this.setState({ maxValue: e.value })

  }

  render() {
    return (
      <div>
        <Label>Max Value Prediction:</Label>
        <Input  onChange={this.setMaxValue} disabled={this.props.disabled} type="number" />
        <Button >Predict</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  configureUser: groupName => dispatch(configureUser(groupName)),
});

export default connect()(MaxValuePrediction);
