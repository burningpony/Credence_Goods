import React, { Component } from 'react';
import styled from 'styled-components';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import ValueCoordinateInput from './value_coordinate_input';
import SamplePointsInput from './sample_points_input';
import MaxValuePredict from './max_value_predictor';


const FlexDisplay = styled.div`
  display: flex;
`;

class FunctionGraph extends Component {
  defaultProps: {
    func: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      boughtPoints: 0,
      boughtCoordinates: 0,
      cost: 0
    };
  }

  func(x) {
    const { func } = this.props;
  }

  data() {
    const { boughtPoints } = this.state;
  }

  horizontalPoints() {
    const { boughtCoordinates } = this.state;
  }

  buyBoughtCoordinates = ({totalCost, valueCoordinates}) => {
    this.setState({
      boughtCoordinates: valueCoordinates,
      cost: this.state.cost + totalCost
    });
  }

  renderCost() {
    const { cost } = this.state;

    if (cost) {
      return `$${Math.round(cost * 100) / 100}`
    }
  }

  render() {
    return (
      <FlexDisplay>

        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <XAxis dataKey="x" type="number" tick={false} />
          <YAxis dataKey="y" type="number" tick={false} />
          <CartesianGrid verticle={false} horizontalPoints={this.horizontalPoints()} />

        </ScatterChart>


        <div>
          <ValueCoordinateInput costOfCoordinate={2.33} callback={this.buyBoughtCoordinates}/>
          <SamplePointsInput />

          <h3>
            Cost:
            { " " }
            <small>{this.renderCost()}</small>
          </h3>


          <MaxValuePredict />

        </div>
        </FlexDisplay>
    );
  }
}

export default FunctionGraph;
