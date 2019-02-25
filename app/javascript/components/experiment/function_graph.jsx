import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../styles/blocks/graph/button';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import math from 'mathjs';
import ValueCoordinateInput from './value_coordinate_input';
import SamplePointsInput from './sample_points_input';
import MaxValuePredict from './max_value_predictor';
import {storeFunctionResponses,updateFunctionResponses} from '../actions/functions_actions'

const FlexDisplay = styled.div`
  display: flex;
`;

class FunctionGraph extends Component {

  static propTypes() {
    return {
      id:PropTypes.function.isRequired,//function_id
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
      alert:false,
      alertType:"success",
      alertText:""
    };

    this.validateAttrs = this.validateAttrs.bind(this)
    this.triggerError = this.triggerError.bind(this)
    this.generateAlert = this.generateAlert.bind(this)

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
      alertType:"error",
      alertText:"Fill all the parameters"
    });
    setTimeout(()=>{
      this.setState({
        alert:false
      });
    },10000)
  }

  generateAlert = () => {
    return (this.state.alert ?<Alert color={this.state.alertType}>
      {this.state.alertText}
      </Alert> : null)
  }

  handleSubmit = (e) => {
    if(this.validateAttrs()){
      e.preventDefault();
      const data = {
        user_id:this.props.user.id,
        part:1,
        ...this.props.responses
      }
      if(this.props.disabled) { 
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

  render() {
    const { minX, maxX } = this.props;
    console.log("props",minX,maxX)
    const { debug } = this.state;
    const {generateAlert} = this
    return (
      <FlexDisplay>
        {generateAlert()}
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
          <ValueCoordinateInput id={this.props.id} costOfCoordinate={2.33} func={this.func} callback={this.buyValueCoordinates} disabled={this.props.disabled} />
          <SamplePointsInput id={this.props.id} max={maxX} min={minX} costOfCoordinate={2.33} func={this.func} callback={this.buySamplePoints} disabled={this.props.disabled} />

          <h3>
            Cos
            <span onClick={e => this.setState({ debug: !this.state.debug })}>t</span>
:
            { ' ' }
            <small>{this.renderCost()}</small>

          </h3>

          <MaxValuePredict id={this.props.id} />

          <button onClick={this.handleSubmit} > Submit Answers </button>
        </div>
      </FlexDisplay>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group.toJS(),
  user: state.user.toJS()
});

const mapDispatchToProps = dispatch => ({
  storeResponse: (groupId,setId,functionId,functionsResponses) => dispatch(storeFunctionResponses(groupId,setId,functionId,functionsResponses)),
  updateResponse: (groupId,setId,functionId,responseId,functionsResponses) => dispatch(updateFunctionResponses(groupId,setId,functionId,responseId,functionsResponses)),

});

export default connect(mapStateToProps,mapDispatchToProps)(FunctionGraph);
