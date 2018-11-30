import React, { Component } from 'react';
import styled from 'styled-components';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import math from 'mathjs';
import ValueCoordinateInput from './value_coordinate_input';
import SamplePointsInput from './sample_points_input';
import MaxValuePredict from './max_value_predictor';


const FlexDisplay = styled.div`
  display: flex;
`;

class FunctionGraph extends Component {
  static propTypes() {
    return {
      func: PropTypes.function.isRequired,
      maxY: PropTypes.number.isRequired,
      maxX: PropTypes.number.isRequired,
      minY: PropTypes.number.isRequired,
      minX: PropTypes.number.isRequired,
    };
  }

  defaultProps: {
    func: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      boughtPoints: [],
      boughtCoordinates: [],
      cost: 0,
    };
  }

  func = (x) => {
    const { func } = this.props;
    return math.eval(func, { x });
  }

  data() {
    const { boughtPoints } = this.state;
    return boughtPoints;
  }

  horizontalPoints() {
    const { boughtCoordinates } = this.state;
    return boughtCoordinates || [];
  }

  buyValueCoordinates = ({ totalCost, coordinates, cost }) => {
    this.setState({
      boughtCoordinates: coordinates,
      cost: cost + totalCost,
    });
  }

  buySamplePoints = ({ totalCost, points, cost }) => {
    this.setState({
      boughtPoints: points,
      cost: cost + totalCost,
    });
  }

  renderCost() {
    const { cost } = this.state;
    let formattedCost = '';
    if (cost) {
      formattedCost = `$${Math.round(cost * 100) / 100}`;
    }
    return formattedCost;
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
          <Scatter name="A school" data={this.data()} fill="#8884d8" />
          <XAxis dataKey="x" type="number" tick={false} />
          <YAxis dataKey="y" type="number" tick={false} />
          <CartesianGrid verticle horizontalPoints={this.horizontalPoints()} />

        </ScatterChart>


        <div>
          <ValueCoordinateInput costOfCoordinate={2.33} func={this.func} callback={this.buyValueCoordinates} />
          <SamplePointsInput costOfCoordinate={2.33} func={this.func} callback={this.buySamplePoints} />

          <h3>
            Cost:
            { ' ' }
            <small>{this.renderCost()}</small>
          </h3>


          <MaxValuePredict />

        </div>
      </FlexDisplay>
    );
  }
}

export default FunctionGraph;
