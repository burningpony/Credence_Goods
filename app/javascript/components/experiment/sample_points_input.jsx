import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../styles/blocks/graph/label';
import { calculateSamplePoint, calculateBounds } from '../helpers/function';
import {Button,Col,Row,Input} from '@bootstrap-styled/v4';

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
      minValue:0
    };
  }

  constructor(props) {
    super(props);
    this.state = this.constructor.defaultState();
    //binding
    this.updateStateAndStorage = this.updateStateAndStorage.bind(this)
    this.renderTotalCost = this.renderTotalCost.bind(this)
  }

  setSamplePoints = (e) => {
    const newSamplePoints = parseFloat(e.target.value);
    if(this.state.minValue > newSamplePoints){
      this.updateStateAndStorage(this.state.minValue);
    } else {
      this.updateStateAndStorage(newSamplePoints);
    }
  }

  updateStateAndStorage(newSamplePoints,callback){
    this.setState((previousState, props) => ({
      samplePoints: newSamplePoints,
      totalCost: ((props.costOfCoordinate * newSamplePoints) + previousState.totalCost) || 0,
    }),callback);
    this.props.updateFunctionResponse(this.props.id,newSamplePoints)
  }

  generatePoints = () => {
    const { func, min, max } = this.props;
    const { samplePoints } = this.state;
    const localPoints = [];
    for (let i = 0; i < samplePoints; i++) {
      // TODO: Determine a method to bounds from a min and max with n as input. loop over bounds
      const [localMin, localMax] = calculateBounds(i + 1, { min, max });
      const [x, y] = calculateSamplePoint(func, localMin, localMax);
      localPoints.push({ x, y });
    }
    return localPoints;
  }

  onClick = () => {
    const { callback } = this.props;
    this.setState(
      { points: this.generatePoints(),
        minValue :this.state.samplePoints },
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
      <Row>
        <Col sm="12">
          <Label>Sample Points:</Label>
          <input min={this.state.minValue} onChange={this.setSamplePoints} disabled={this.props.disabled} type="number" value={this.state.samplePoints}/>
        </Col>
        <Col sm="12">
          <Button onClick={this.onClick}>SUBMIT</Button>
          Cost:
          {' '}
          { this.renderTotalCost() }
        </Col>
      </Row>
    );
  }
}

export default SamplePoints;
