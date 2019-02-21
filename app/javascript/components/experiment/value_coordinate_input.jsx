import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';
import { connect } from 'react-redux';

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
    };
  }

  constructor(props) {
    super(props);
    this.state = this.constructor.defaultState();
  }

  /**
   * @description
   * @param {ReactSyntheticEvent} e
   * @returns
   * @memberof ValueCoordinate
   */
  setValueCoordinates = (e) => {
    const newValueCoordinates = parseFloat(e.target.value);
    this.setState((previousState, props) => ({
      valueCoordinates: newValueCoordinates,
      totalCost: ((props.costOfCoordinate * newValueCoordinates) + previousState.totalCost) || 0,
    }));
    this.props.dispatch({ type:'SAVE_FUNCTION_RESPONSES', id: this.props.id, field: "num_bought_value_coordinates", value:newValueCoordinates })
  }

  generateCoordinates = () => {
    const { valueCoordinates } = this.state;
    const localCoordinates = [];

    for (let i = 0; i < valueCoordinates; i++) {
      localCoordinates.push(i * Math.random());
    }

    return localCoordinates;
  }

  onClick = (e) => {
    const { callback } = this.props;
    this.setState(
      { coordinates: this.generateCoordinates() },
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
      <div>
        <Label>Value Coordinates:</Label>
        <Input onChange={this.setValueCoordinates} disabled={this.props.disabled} type="number" />
        <Button onClick={this.onClick}>SUBMIT</Button>
        Cost:
        {' '}

        { this.renderTotalCost() }
      </div>
    );
  }
}

export default connect()(ValueCoordinate);
