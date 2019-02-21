import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';
import { calculateSamplePoint, calculateBounds } from '../helpers/function';
import { connect } from 'react-redux';

class SamplePoints extends Component {
  static propTypes() {
    return {
      id:PropTypes.function.isRequired,//function_id
      func: PropTypes.function.isRequired,
      costOfPoint: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      callback: PropTypes.function.isRequired,
    };
  }

  static defaultState() {
    return {
      totalCost: 0,
      totalPoints: 0,
      valuePoints: 0,
      cost: 0,
      points: [],
    };
  }

  constructor(props) {
    super(props);
    this.state = this.constructor.defaultState();
  }

  setSamplePoints = (e) => {
    const newSamplePoints = parseFloat(e.target.value);
    this.setState((previousState, props) => ({
      samplePoints: newSamplePoints,
      totalCost: ((props.costOfCoordinate * newSamplePoints) + previousState.totalCost) || 0,
    }));
    this.props.dispatch({ type:'SAVE_FUNCTION_RESPONSES', id: this.props.id, field: "num_bought_sample_points", value:newSamplePoints })

  }

  generatePoints = () => {
    const { func, min, max } = this.props;
    const { samplePoints } = this.state;
    const localPoints = [];

    for (let i = 0; i < samplePoints; i++) {
      // TODO: Determine a method to bounds from a min and max with n as input. loop over bounds
      console.log(i, min, max);

      const [localMin, localMax] = calculateBounds(i + 1, { min, max });

      const [x, y] = calculateSamplePoint(func, localMin, localMax);
      console.log(x, y);

      localPoints.push({ x, y });
    }

    return localPoints;
  }

  onClick = () => {
    const { callback } = this.props;
    this.setState(
      { points: this.generatePoints() },
      () => {
        callback(this.state);
        // this.setState(this.constructor.defaultState());
      },
    );
  }

  renderTotalCost() {
    const { totalCost } = this.state;

    if (totalCost) {
      return Math.round(totalCost * 100) / 100;
    }
  }

  render() {
    const { cost } = this.state;
    return (
      <div>
        <Label>Sample Points:</Label>
        <Input onChange={this.setSamplePoints} disabled={this.props.disabled} type="number" />
        <Button onClick={this.onClick}>SUBMIT</Button>
        Cost:
        {' '}
        { this.renderTotalCost() }
      </div>
    );
  }
}

export default connect()(SamplePoints);
