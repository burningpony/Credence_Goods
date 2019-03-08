import React, { Component } from 'react';
import SamplePointsInput from './sample_points_input';
import PropTypes from 'prop-types';
import Button from '../styles/blocks/graph/button';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';
import { calculateSamplePoint, calculateBounds } from '../helpers/function';

class SamplePointsView extends SamplePointsInput{
  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(newProps.num_bought_sample_points){
      if((!oldProps.num_bought_sample_points) || (oldProps.num_bought_sample_points != newProps.num_bought_sample_points)) {
        this.updateStateAndStorage(this.props.num_bought_sample_points,this.onClick);
        
      }
    }
  }

  render(){
    return (
        <div>
          <Label>Sample Points:</Label>
          <Input value={this.props.num_bought_sample_points || 0} disabled={true} type="number" />
          Cost:
          {' '}
          { this.renderTotalCost() }
        </div>
      );
    }

}
export default SamplePointsView;