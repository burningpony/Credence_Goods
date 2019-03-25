import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from '../styles/blocks/graph/label';
import Input from '../styles/blocks/graph/input';
import {Button,Col,Row,Alert} from '@bootstrap-styled/v4';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,
} from 'recharts';

import math from 'mathjs';

import ValueCoordinateInput from '../../containers/experiment/value_coordinate_input';
import ValueCoordinateView from '../../containers/experiment/value_coordinate_view';
import SamplePointsInput from '../../containers/experiment/sample_points_input';
import SamplePointsView from '../../containers/experiment/sample_points_view';
import MaxValuePredict from '../../containers/experiment/max_value_predictor';

const FlexDisplay = styled.div`
  display: flex;
`;

class FunctionGraph extends Component {
  
  static propTypes() {
    return {
      id:PropTypes.number.isRequired,//function_id
      func: PropTypes.function.isRequired,
      maxY: PropTypes.number.isRequired,
      maxX: PropTypes.number.isRequired,
      minY: PropTypes.number.isRequired,
      minX: PropTypes.number.isRequired,
      round: PropTypes.number.isRequired,
      responses: PropTypes.object.isRequired,
      viewMode: PropTypes.boolean.isRequired,
      part:PropTypes.string.isRequired
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      boughtPoints: [],
      boughtCoordinates: [],
      valueCoordinates:0,
      cost: 0,
      debug: true,
      alert:false,
      alertType:"warning",
      alertText:"",
      verticalTick:false,
      firstTimeInput:false,
      startTime:0
    };

    this.validateAttrs = this.validateAttrs.bind(this)
    this.triggerError = this.triggerError.bind(this)
    this.generateAlert = this.generateAlert.bind(this)
    this.checkForFirstTimeInput = this.checkForFirstTimeInput.bind(this)

    this.renderValueCoordinate = this.renderValueCoordinate.bind(this)
    this.renderMaxValue = this.renderMaxValue.bind(this)
    this.renderSamplePoints = this.renderSamplePoints.bind(this)
    this.renderSubmitButton = this.renderSubmitButton.bind(this)
  }
 

  func = (x) => {
    const { func } = this.props;
    return math.eval(func, { x });
  }

  data() {
    const { boughtPoints } = this.state;
    return boughtPoints;
  }

  //callbacks
  horizontalPoints() {
      if(this.state.valueCoordinates<2){
        return 2
      }else{
        return (this.state.valueCoordinates+1);
      }
  }

  checkForFirstTimeInput(){
    if(!this.state.firstTimeInput){
      const date = new Date().getTime()
      this.setState({firstTimeInput:true,startTime: date,verticalTick:true})
    }
  }

  buyValueCoordinates = ({ valueCoordinates,totalCost, coordinates, cost }) => {
    this.checkForFirstTimeInput()
    this.setState({
      boughtCoordinates: coordinates,
      valueCoordinateCost: totalCost,
      valueCoordinates
    });
  }

  buySamplePoints = ({ totalCost, points, cost }) => {
    this.checkForFirstTimeInput()
    this.setState({
      boughtPoints: points,
      samplePointsCost: totalCost,
    });
  }

  renderCost() {
    const { samplePointsCost,valueCoordinateCost } = this.state;
    const cost = samplePointsCost+valueCoordinateCost;
    let formattedCost = '';
    if (cost) {
      formattedCost = `$${Math.round(cost * 100) / 100}`;
    }
    return formattedCost;
  }

  validateAttrs = () => {
    if(this.props.responses){
      return !(
        isNaN(this.props.responses.max_value_prediction) &&
        isNaN(this.props.responses.num_bought_value_coordinates) &&
        isNaN(this.props.responses.num_bought_sample_points)
         )
    }
    return false
  }

  triggerError = () => {
    this.setState({
      alert:true,
      alertType:"danger",
      alertText:"Fill all the parameters"
    });
    setTimeout(()=>{
      this.setState({
        alert:false
      });
    },10000)
  }

  generateAlert = () => {
    return (this.state.alert ? <Alert color={this.state.alertType}>
      {this.state.alertText}
      </Alert> : null)
  }

  handleSubmit = (e) => {
    if(this.validateAttrs()){
      e.preventDefault();
      const finishTime = new Date().getTime()
      console.log("time spent",(finishTime-this.state.startTime),finishTime,this.state.startTime)
      const data = {
        user_id:this.props.user.id,
        part:this.props.part,
        round_number:(this.props.round ? this.props.round : 1),
        time_to_response:(finishTime-this.state.startTime),
        ...this.props.responses,
      }
      if(this.props.disabled) { //if was save 
        const {updateResponse} = this.props
        updateResponse(this.props.group.id,this.props.group.function_set_id,this.props.id,this.props.responses.response_id,data)
      } else {
        const {storeResponse} = this.props
        storeResponse(this.props.group.id,this.props.group.function_set_id,this.props.id,data)
      }
    } else {
      this.triggerError()
    }
  }

  renderValueCoordinate(){
    const { minX, maxX } = this.props;
    if(this.props.viewMode){
      return (<ValueCoordinateView id={this.props.id} costOfCoordinate={2.33} func={this.func} callback={this.buyValueCoordinates} num_bought_value_coordinates={this.props.responses.num_bought_value_coordinates} disabled={this.props.disabled} />)
    }
    return (<ValueCoordinateInput id={this.props.id} costOfCoordinate={2.33} func={this.func} callback={this.buyValueCoordinates} disabled={this.props.disabled} />)
  }

  renderSamplePoints(){
    const { minX, maxX } = this.props;
    if(this.props.viewMode){
      return (<SamplePointsView id={this.props.id} max={maxX} min={minX} costOfCoordinate={2.33} func={this.func} num_bought_sample_points={this.props.responses.num_bought_sample_points} callback={this.buySamplePoints} disabled={this.props.disabled} />)
    }
    return (<SamplePointsInput id={this.props.id} max={maxX} min={minX} costOfCoordinate={2.33} func={this.func} callback={this.buySamplePoints} disabled={this.props.disabled} />)
  }

  renderMaxValue(){
    const { minX, maxX } = this.props;
    if(this.props.viewMode){
      return (
        <div>
          <Label>Max Value Prediction: </Label>
          <Input value={this.props.responses.max_value_prediction || 0} disabled={true} type="number"/>
        </div>
      );
    }
    return (<MaxValuePredict id={this.props.id} viewMode={this.props.viewMode} />)
  }

  renderSubmitButton(){
    if(!this.props.viewMode){
      return(<Button onClick={this.handleSubmit} > Predict </Button>)
    }
    return(<div></div>)
  }


  render() {
    const { minX, maxX ,minY,maxY} = this.props;
    const { debug,verticalTick } = this.state;
    const {generateAlert,renderSubmitButton,renderValueCoordinate,renderSamplePoints,renderMaxValue} = this
    return (
      <Row>
        <Col lg="12">
          {generateAlert()}
        </Col>
        <Col lg="6">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 5, right: 5, bottom: 5, left: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Scatter name="A school" line={debug} data={this.data()} fill="#8884d8" stroke="none" />
          <XAxis dataKey="x" type="number" tick={false} />  
          <YAxis dataKey="y" type="number" tick={verticalTick} domain={[minY,maxY]} tickCount={this.horizontalPoints()}/>
        </ScatterChart>
        </Col>
        <Col lg="6">   
          {renderValueCoordinate()}
          {renderSamplePoints()}
          <h3>
            Cos
            <span onClick={e => this.setState({ debug: !this.state.debug })}>t</span>
:
            { ' ' }
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
