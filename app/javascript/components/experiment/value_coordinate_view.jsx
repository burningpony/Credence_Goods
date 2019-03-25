import React, { Component } from 'react';
import ValueCoordinate from './value_coordinate_input';
import Label from '../styles/blocks/graph/label';
import {Button,Col,Row,Input} from '@bootstrap-styled/v4';

class ValueCoordinateView extends ValueCoordinate{
  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(newProps.num_bought_value_coordinates){
        if((!oldProps.num_bought_value_coordinates) || (oldProps.num_bought_value_coordinates != newProps.num_bought_value_coordinates)) {
        console.log('entre')
        this.updateStateAndStorage(this.props.num_bought_value_coordinates,this.onClick);
        }
    }
  }

  render(){
    return (
        <div>
          <Label>Value Coordinates:</Label>
          <Input value={this.props.num_bought_value_coordinates || 0} disabled={true} type="number" />
          Cost:
          {' '}
          { this.renderTotalCost() }
        </div>
      );
    }

}
export default ValueCoordinateView;