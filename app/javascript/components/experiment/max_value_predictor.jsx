import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';

class MaxValuePrediction extends Component {
  static propTypes() {
    return {
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

  render() {
    return (
      <div>
        <Label>Max Value Prediction:</Label>
        <Input onChange={e => this.setState({ maxValue: e.value })} type="number" />
        <Button>Predict</Button>
      </div>
    );
  }
}

export default MaxValuePrediction;
