import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Col, Row, Input 
} from '@bootstrap-styled/v4';
import Label from '../styles/blocks/graph/label';
import { calculateSamplePoint, calculateBounds } from '../helpers/function';

class SamplePointsInput extends Component {
  static propTypes() {
    return {
      id: PropTypes.function.isRequired, // function_id
      func: PropTypes.function.isRequired,
      costOfPoint: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      callback: PropTypes.function.isRequired,
    };
  }

  state = {
    totalCost: 0,
    points: [],
    numSamplePoints: 0,
    minValue: 0,
  };

  setNumSamplePoints = (e) => {
    const newNumSamplePoints = parseFloat(e.target.value);
    this.setState(
      {
        numSamplePoints: newNumSamplePoints,
      },
      () => {
        if (newNumSamplePoints > this.state.minValue) {
          this.setState({
            totalCost: this.props.costOfPoint * newNumSamplePoints || 0,
          });
          this.props.updateFunctionResponse(this.props.id, newNumSamplePoints);
        }
      },
    );
  };

  generatePoints = () => {
    const { func, min, max } = this.props;
    const { numSamplePoints } = this.state;
    const localPoints = [];

    for (let i = 0; i < numSamplePoints; i++) {
      const [localMin, localMax] = calculateBounds(i + 1, { min, max });
      const [x, y] = calculateSamplePoint(func, localMin, localMax);
      localPoints.push({ x, y });
    }
    return localPoints;
  };

  handleClick = (e) => {
    const { callback } = this.props;
    const { numSamplePoints, minValue } = this.state;

    if (numSamplePoints < minValue) {
      this.setState({ numSamplePoints: minValue });
    } else {
      this.setState(
        {
          points: this.generatePoints(),
          minValue: numSamplePoints,
        },
        () => callback(this.state),
      );
    }
  };

  render() {
    const { totalCost, minValue, numSamplePoints } = this.state;
    return (
      <Row>
        <Col sm="12">
          <Label>Sample Points:</Label>
          <Input
            min={minValue}
            onChange={this.setNumSamplePoints}
            disabled={this.props.disabled}
            type="number"
            value={numSamplePoints}
          />
        </Col>
        <Col sm="12">
          <Button onClick={this.handleClick}>SUBMIT</Button>
          Cost: &nbsp;
          {totalCost && Math.round(totalCost * 100) / 100}
          &nbsp;
        </Col>
      </Row>
    );
  }
}

export default SamplePointsInput;
