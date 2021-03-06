import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
 Button, Col, Row, Alert 
} from '@bootstrap-styled/v4';

import {
 ScatterChart, Scatter, XAxis, YAxis, CartesianGrid 
} from 'recharts';

import math from 'mathjs';
import Input from '../styles/blocks/graph/input';
import Label from '../styles/blocks/graph/label';

import ValueCoordinateInput from '../../containers/experiment/value_coordinate_input';
import ValueCoordinateView from '../../containers/experiment/value_coordinate_view';
import SamplePointsInput from '../../containers/experiment/sample_points_input';
import SamplePointsView from '../../containers/experiment/sample_points_view';
import MaxValuePredict from '../../containers/experiment/max_value_predictor';
import { costOfCoordinate, costOfPoint } from './constants';

const FlexDisplay = styled.div`
  display: flex;
`;

class FunctionGraph extends Component {
  static propTypes() {
    return {
      id: PropTypes.number.isRequired, // function_id
      func: PropTypes.function.isRequired,
      maxY: PropTypes.number.isRequired,
      maxX: PropTypes.number.isRequired,
      minY: PropTypes.number.isRequired,
      minX: PropTypes.number.isRequired,
      round: PropTypes.number.isRequired,
      responses: PropTypes.object.isRequired,
      viewMode: PropTypes.boolean.isRequired,
      part: PropTypes.string.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      boughtPoints: [],
      numValueCoordinates: 0,
      samplePoints: 0,
      samplePointsCost: 0,
      valueCoordinateCost: 0,
      alert: false,
      alertType: 'warning',
      alertText: '',
      verticalTick: false,
      firstTimeInput: false,
      startTime: 0,
      maxValuePrediction: undefined,
    };

    this.validateAttrs = this.validateAttrs.bind(this);
    this.triggerError = this.triggerError.bind(this);
    this.generateAlert = this.generateAlert.bind(this);
    this.checkForFirstTimeInput = this.checkForFirstTimeInput.bind(this);

    this.renderValueCoordinate = this.renderValueCoordinate.bind(this);
    this.renderMaxValue = this.renderMaxValue.bind(this);
    this.renderSamplePoints = this.renderSamplePoints.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }

  func = (x) => {
    const { func } = this.props;
    return math.eval(func, { x });
  };

  data() {
    const { boughtPoints } = this.state;
    return boughtPoints;
  }

  // callbacks
  horizontalPoints() {
    const delta = this.props.maxY / this.state.numValueCoordinates;
    const ticks = [0];
    let line = delta;
    for (let index = 0; index < this.state.numValueCoordinates; index++) {
      ticks.push(line.toFixed(2));
      line += delta;
    }
    return ticks;
  }

  checkForFirstTimeInput() {
    if (!this.state.firstTimeInput) {
      const date = new Date().getTime();
      this.setState({
        firstTimeInput: true,
        startTime: date,
        verticalTick: true,
      });
    }
  }

  buyValueCoordinates = ({ numValueCoordinates, totalCost }) => {
    this.checkForFirstTimeInput();
    if (this.state.samplePointsCost + totalCost <= 5) {
      this.setState({
        valueCoordinateCost: totalCost,
        numValueCoordinates,
      });
    } else {
      this.triggerError(
        "The value of Sample points and Value Coordinates coultdn't be greater than $5",
      );
    }
  };

  buySamplePoints = ({ totalCost, points, numSamplePoints }) => {
    this.checkForFirstTimeInput();
    if (this.state.valueCoordinateCost + totalCost <= 5) {
      this.setState({
        samplePoints: numSamplePoints,
        boughtPoints: points,
        samplePointsCost: totalCost,
      });
    } else {
      this.triggerError(
        "The value of Sample points and Value Coordinates coultdn't be greater than $5",
      );
    }
  };

  renderCost() {
    const { samplePointsCost, valueCoordinateCost } = this.state;
    const cost = samplePointsCost + valueCoordinateCost;
    let formattedCost = '';
    if (cost) {
      formattedCost = `$${Math.round(cost * 100) / 100}`;
    }
    return formattedCost;
  }

  validateAttrs = () => {
    if (this.state.maxValuePrediction) return true;
    return false;
  };

  triggerError = (text = 'Nothing was predicted!') => {
    this.setState({
      alert: true,
      alertType: 'danger',
      alertText: text,
    });
    setTimeout(() => {
      this.setState({
        alert: false,
      });
    }, 10000);
  };

  generateAlert = () => (this.state.alert ? (
      <Alert color={this.state.alertType}>{this.state.alertText}</Alert>
    ) : null);

  handleSubmit = (e) => {
    if (this.validateAttrs()) {
      e.preventDefault();
      const finishTime = new Date().getTime();
      const data = {
        user_id: this.props.user.id,
        part: this.props.part,
        round_number: this.props.round ? this.props.round : 1,
        time_to_response: finishTime - this.state.startTime,
        ...this.props.responses,
      };
      if (this.props.disabled) {
        // if was save
        const { updateResponse } = this.props;
        updateResponse(
          this.props.group.id,
          this.props.group.function_set_id,
          this.props.id,
          this.props.responses.response_id,
          data,
        );
      } else {
        const { storeResponse } = this.props;
        storeResponse(
          this.props.group.id,
          this.props.group.function_set_id,
          this.props.id,
          data,
        );
      }
    } else {
      this.triggerError();
    }
  };

  renderValueCoordinate() {
    const { minX, maxX } = this.props;
    if (this.props.viewMode) {
      return (
        <ValueCoordinateView
          id={this.props.id}
          costOfCoordinate={costOfCoordinate}
          func={this.func}
          callback={this.buyValueCoordinates}
          num_bought_value_coordinates={
            this.props.responses.num_bought_value_coordinates
          }
          disabled={this.props.disabled}
        />
      );
    }

    return (
      <ValueCoordinateInput
        id={this.props.id}
        costOfCoordinate={costOfCoordinate}
        func={this.func}
        callback={this.buyValueCoordinates}
        disabled={this.props.disabled}
        minValue={this.state.numValueCoordinates}
      />
    );
  }

  renderSamplePoints() {
    const { minX, maxX } = this.props;
    if (this.props.viewMode) {
      return (
        <SamplePointsView
          id={this.props.id}
          max={maxX}
          min={minX}
          costOfPoint={costOfPoint}
          func={this.func}
          num_bought_sample_points={
            this.props.responses.num_bought_sample_points
          }
          callback={this.buySamplePoints}
          disabled={this.props.disabled}
        />
      );
    }

    return (
      <SamplePointsInput
        id={this.props.id}
        max={maxX}
        min={minX}
        costOfPoint={costOfPoint}
        func={this.func}
        callback={this.buySamplePoints}
        disabled={this.props.disabled}
        minValue={this.state.samplePoints}
        total={this.totalCost}
      />
    );
  }

  handleMaxValueChange = (e) => {
    this.setState({ maxValuePrediction: e.target.value });
  };

  renderMaxValue() {
    const { minX, maxX } = this.props;
    if (this.props.viewMode) {
      return (
        <div>
          <Label>Max Value Prediction: </Label>
          <Input
            value={this.props.responses.max_value_prediction || 0}
            disabled
            type="number"
          />
        </div>
      );
    }

    return (
      <MaxValuePredict
        id={this.props.id}
        onChange={this.handleMaxValueChange}
      />
    );
  }

  renderSubmitButton() {
    if (!this.props.viewMode) {
      return (
        <Button name="prediction" size="sm" onClick={this.handleSubmit}>
          {' '}
          Predict
{" "}
        </Button>
      );
    }
    return <div />;
  }

  render() {
    const {
 minX, maxX, minY, maxY 
} = this.props;
    const { verticalTick } = this.state;
    const {
      generateAlert,
      renderSubmitButton,
      renderValueCoordinate,
      renderSamplePoints,
      renderMaxValue,
    } = this;
    return (
      <Row className="p-4">
        <Col lg="12">{generateAlert()}</Col>
        <Col lg="6">
          <ScatterChart
            width={400}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 5,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Scatter
              name="Points"
              data={this.data()}
              fill="#8884d8"
              stroke="none"
            />
            <XAxis
              dataKey="x"
              type="number"
              tick={false}
              domain={[
                minX - Math.abs((maxX - minX) / 40),
                maxX + Math.abs((maxX - minX) / 40),
              ]}
            />
            <YAxis
              dataKey="y"
              type="number"
              tick={verticalTick || undefined}
              domain={[
                minY - Math.abs((maxY - minY) / 40),
                maxY + Math.abs((maxY - minY) / 40),
              ]}
              ticks={this.horizontalPoints()}
              allowDecimals
              allowDataOverflow
              interval={0}
            />
          </ScatterChart>
        </Col>
        <Col lg="6">
          {renderValueCoordinate()}
          {renderSamplePoints()}
          <h3>
            Cost:&nbsp;
            <small>{this.renderCost()}</small>
          </h3>
          {renderMaxValue()}
          {renderSubmitButton()}
        </Col>
      </Row>
    );
  }
}

export default FunctionGraph;
