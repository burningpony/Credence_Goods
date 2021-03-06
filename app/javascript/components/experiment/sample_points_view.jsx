import React from 'react';
import SamplePointsInput from './sample_points_input';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';

class SamplePointsView extends SamplePointsInput {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (newProps.num_bought_sample_points) {
      if ((!oldProps.num_bought_sample_points) || (oldProps.num_bought_sample_points != newProps.num_bought_sample_points)) {
        this.setState({
          numSamplePoints: newProps.num_bought_sample_points,
          totalCost: this.props.costOfPoint * newProps.num_bought_sample_points || 0,
        }, this.handleClick);
      }
    }
  }

  render() {
    return (
      <div>
        <Label>Sample Points:</Label>
        <Input value={this.props.num_bought_sample_points || 0} disabled type="number" />
          Cost:
        {' '}
        { this.renderTotalCost() }
      </div>
    );
  }
}
export default SamplePointsView;
