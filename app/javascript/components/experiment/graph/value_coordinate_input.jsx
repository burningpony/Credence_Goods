import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../styles/blocks/graph/button';
import Label from '../../styles/blocks/graph/label';
import Input from '../../styles/blocks/graph/input';

class ValueCoordinate extends Component {
  static propTypes() {
    return {
      functionString: PropTypes.string.isRequired,
      costOfCoordinate: PropTypes.number.isRequired,
      callback: PropTypes.number.isRequired,
    };
  }

  static defaultState() {
    return {
      totalCost: 0,
      totalCoordinates: 0,
      valueCoordinates: 0,
      cost: 0,
      cooordinates: [],
    };
  }

  constructor(props) {
    super(props);
    this.state = this.constructor.defaultState();
  }

  setValueCoordinates(e) {
    return () => {
      this.setState();
    };
  }

  onClick(e) {
    this.callback(this.state);
    this.setState(this.constructor.defaultState());
  }

  render() {
    const { cost } = this.state;
    return (
      <div>
        <Label>Value Coordinates:</Label>
        <Input onChange={this.setValueCoordinates()} type="number" />
        <Button>SUBMIT</Button>
        Cost:
        {' '}
        {cost}
      </div>
    );
  }
}

export default ValueCoordinate;
