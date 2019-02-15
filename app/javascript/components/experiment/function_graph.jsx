import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  constructor(props) {
    super(props);
    this.state = {
      boughtPoints: [],
      boughtCoordinates: [],
      cost: 0,
      debug: true,
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
    const { minX, maxX } = this.props;
    console.log("props",minX,maxX)
    const { debug } = this.state;
    return (
      <FlexDisplay>

        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 5, right: 5, bottom: 5, left: 5,
          }}
        >
          <Scatter name="A school" line={debug} data={this.data()} fill="#8884d8" />
          <XAxis dataKey="x" type="number" tick={debug} />
          <YAxis dataKey="y" type="number" tick={debug} />
          <CartesianGrid strokeDasharray="3 3" horizontalPoints={this.horizontalPoints()} />

        </ScatterChart>

        <div>
          <ValueCoordinateInput costOfCoordinate={2.33} func={this.func} callback={this.buyValueCoordinates} />
          <SamplePointsInput max={maxX} min={minX} costOfCoordinate={2.33} func={this.func} callback={this.buySamplePoints} />

          <h3>
            Cos
            <span onClick={e => this.setState({ debug: !this.state.debug })}>t</span>
:
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
