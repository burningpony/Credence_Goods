import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import { gss } from '../helpers/function';
import math from "mathjs";
import {costOfCoordinate,costOfPoint} from './constants'
import {getFunctionResponses} from '../actions/functions_actions'
class PaymentSummaryPart2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
        payment: 30,
        responses: []
      }
    }
  

  getFunctionResponses = async () => {
    const responses = await getFunctionResponses();
    this.setState({responses});
  }

  calculateCapitation = () => {
    let total = 0;
    const differentGroups = [...new Set(this.state.responses.map(x => x.set_id)) ]
    differentGroups.forEach((gr)=>{
      const value = this.state.responses.find(x => (x.max_value_prediction!==null && x.set_id === gr)) ? 1 : 0;
      total += value;
    })
  }

  calculateFeeForService = () => {
    let total = 0;
    this.state.responses.forEach((res)=>{
      total = total+(res.num_bought_sample_points * 0.20)+(res.num_bought_value_coordinates * 0.20) + (res.max_value_prediction * 0.60)
    });
    return total;
  }

  calculateSalary = () => {
    return 10;
  }

  calculatePayment = () => {
    const {group,functions} = this.props;
    let totalPayment =  0;
    functions.forEach(item => {
        const func = (x) => {
            return math.eval(item.representation, { x });
        };
        const actualMax = gss(func,item.min_x,item.max_x)
        const maxValuePredicted = item.responses.max_value_prediction ? item.responses.max_value_prediction : 0 ;
        const costValueCoordinates = item.responses.num_bought_value_coordinates*costOfCoordinate;
        const costSamplePoints = item.responses.num_bought_sample_points*costOfPoint;
        console.log("max",actualMax,maxValuePredicted);
        totalPayment = totalPayment+(actualMax - Math.abs((maxValuePredicted-actualMax)) - costValueCoordinates - costSamplePoints) 
        
    });
    return parseFloat(totalPayment).toFixed(2);
  }
  
  render() {
    return (
      <div>
          <h1 id="title"> Payment Summary for Part 1 </h1>
            <div>
                <p>For each function payment will be:</p>
                <p>Payment = Actual Maximum – ⎢Predicted – Actual ⎢ – Cost of Coordinates - Cost of Points</p>
                <p>Total Cost ${this.calculatePayment()}</p>
                <p>Total Payment = ${parseFloat(this.state.payment - this.calculatePayment()).toFixed(2)}</p>
            </div>
            <Button onClick={() => this.props.transition('group_selection')} color="success" id="continue">
               Continue
            </Button>
      </div>
    );
  }
}

export default PaymentSummaryPart2;
