import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';

class SamplePoints extends Component {
  static propTypes() {
    return {
      functionString: PropTypes.string.isRequired,
      costOfPoint: PropTypes.number.isRequired,
      callback: PropTypes.number.isRequired,
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
  }

  generatePoints = () => {
    const { samplePoints } = this.state;
    const localPoints = [];

    for (let i = 0; i < samplePoints; i++) {
      localPoints.push({ x: i * Math.random(), y: i * Math.random() });
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
        <Input onChange={this.setSamplePoints} type="number" />
        <Button onClick={this.onClick}>SUBMIT</Button>
        Cost:
        {' '}
        { this.renderTotalCost() }
      </div>
    );
  }
}

export default SamplePoints;
