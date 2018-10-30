import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';

class ValueCoordinate extends Component {
  static propTypes() {
    return {
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
      cooordinates: [],
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
    const newValueCoordinates = parseFloat(e.target.value)
    this.setState((previousState, props) => {
      return {
        valueCoordinates: newValueCoordinates,
        totalCost: ((props.costOfCoordinate * newValueCoordinates) + previousState.totalCost) || 0
      }
    });
  }

  onClick = (e) => {
    this.props.callback(this.state);
    this.setState(this.constructor.defaultState());
  }

  renderTotalCost() {
    const { totalCost } = this.state;

    if (totalCost) {
      return Math.round(totalCost * 100) / 100
    }

  }

  render() {

    return (
      <div>
        <Label>Value Coordinates:</Label>
        <Input onChange={this.setValueCoordinates} type="number" />
        <Button onClick={this.onClick}>SUBMIT</Button>
        Cost:
        {' '}

        { this.renderTotalCost() }
      </div>
    );
  }

}

export default ValueCoordinate;
