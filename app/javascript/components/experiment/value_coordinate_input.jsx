import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button,Col,Row,Input} from '@bootstrap-styled/v4';
import Label from '../styles/blocks/graph/label';
const rowStyle = { marginBottom: '10px' };

class ValueCoordinate extends Component {

  static propTypes() {
    return {
      id:PropTypes.function.isRequired,//function_id
      functionString: PropTypes.string.isRequired,
      costOfCoordinate: PropTypes.number.isRequired,
      callback: PropTypes.func.isRequired,
    };
  }

  static defaultState() {
    return {
      totalCost: 0,
      totalCoordinates: 0,
      valueCoordinates: 0,
      coordinates: [],
      minValue:2
    };
  }

  constructor(props) {
    super(props);
    this.state = this.constructor.defaultState();
    this.updateStateAndStorage = this.updateStateAndStorage.bind(this)
  }

  /**
   * @description
   * @param {ReactSyntheticEvent} e
   * @returns
   * @memberof ValueCoordinate
   */
  setValueCoordinates = (e) => {
    const newValueCoordinates = parseFloat(e.target.value);
    if(this.state.minValue > newValueCoordinates){
      this.updateStateAndStorage(this.state.minValue);
    } else {
      this.updateStateAndStorage(newValueCoordinates);
    }  
  }

  updateStateAndStorage(newValueCoordinates,callback) {
    this.setState((previousState, props) => ({
      valueCoordinates: newValueCoordinates,
      totalCost: ((props.costOfCoordinate * newValueCoordinates) + previousState.totalCost) || 0,
    }),callback);
    this.props.updateFunctionResponse(this.props.id,newValueCoordinates)
  }

  generateCoordinates = () => {
    const { valueCoordinates } = this.state;
    const localCoordinates = [];

    for (let i = 0; i < valueCoordinates; i++) {
      localCoordinates.push((i * Math.random()));
    }

    return localCoordinates;
  }

  onClick = (e) => {
    const { callback } = this.props;
  
    this.setState(
      { coordinates: this.generateCoordinates(),
        minValue:this.state.valueCoordinates },
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
    return (
      <Row style={rowStyle}>
        <Col sm="12">
          <Label>Value Coordinates:</Label>
          <input min={this.state.minValue} onChange={this.setValueCoordinates} disabled={this.props.disabled} type="number" value={this.state.valueCoordinates} />
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

export default ValueCoordinate;
