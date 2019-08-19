import React, { Component } from 'react';
import {
  Button, Col, Row, Input,
} from '@bootstrap-styled/v4';
import ValueCoordinate from './value_coordinate_input';
import Label from '../styles/blocks/graph/label';

class ValueCoordinateView extends ValueCoordinate {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (newProps.num_bought_value_coordinates) {
      if ((!oldProps.num_bought_value_coordinates) || (oldProps.num_bought_value_coordinates != newProps.num_bought_value_coordinates)) {
        this.setState({
          numValueCoordinates: newProps.num_bought_value_coordinates,
          totalCost: this.props.costOfCoordinate * newProps.num_bought_value_coordinates || 0,
        },this.handleClick);
      }
    }
  }

  render() {
    return (
      <div>
        <Label>Value Coordinates:</Label>
        <Input value={this.props.num_bought_value_coordinates || 0} disabled type="number" />
          Cost:
        {' '}
        { this.renderTotalCost() }
      </div>
    );
  }
}
export default ValueCoordinateView;
