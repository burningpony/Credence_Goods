import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import math from 'mathjs';
import { gss } from '../helpers/function';
import { costOfCoordinate, costOfPoint } from './constants';
import { getFunctionResponses } from '../actions/functions_actions';

class PaymentSummaryPart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 30,
      responses: [],
    };
  }

  componentDidMount() {
    this.getFunctionResponses();
  }

  getFunctionResponses = () => {
    getFunctionResponses(this.props.user.id).then((responses) => {
      console.log(responses);
      this.setState({ responses });
    });
  }

  calculateCapitation = () => {
    let total = 0;
    const differentGroups = [...new Set(this.state.responses.map(x => x.set_id))];
    differentGroups.forEach((gr) => {
      const value = this.state.responses.find(x => (x.max_value_prediction !== null && x.set_id === gr)) ? this.props.group.capitation_payment : 0;
      total += value;
    });
    return total;
  }

  calculateFeeForService = () => {
    let total = 0;
    this.state.responses.forEach((res) => {
      total = total + (res.num_bought_sample_points * this.props.group.ffs_payment) + (res.num_bought_value_coordinates * this.props.group.ffs_payment) + (res.max_value_prediction * ((this.props.group.ffs_payment * 2) - 1));
    });
    return total;
  }

  calculateSalary = () => this.props.group.salary_payment

  calculatePaymentFunction = () => {
    const { responses } = this.props;
    let totalPayment = 0;
    responses.forEach((item) => {
      const func = x => math.eval(item.representation, { x });
      const actualMax = gss(func, item.min_x, item.max_x);
      const maxValuePredicted = item.max_value_prediction ? item.max_value_prediction : 0;
      const costValueCoordinates = item.num_bought_value_coordinates * costOfCoordinate;
      const costSamplePoints = item.num_bought_sample_points * costOfPoint;
      totalPayment += (actualMax - Math.abs((maxValuePredicted - actualMax)) - costValueCoordinates - costSamplePoints);
    });
    return parseFloat(totalPayment).toFixed(2);
  }

  calculatePayment = () => {
    if (this.props.user.role == 'B') {
        if(this.props.group.default_payment === 0){
            return this.calculateSalary();
        } if(this.props.group.default_payment === 1){
          return this.calculateCapitation();
        } 
          return this.calculateFeeForService();
        
    }  //player A payment based on performance on player B
      return this.calculatePaymentFunction();
    
  }

  render() {
    return (
      <div>
        <h1 id="title"> Payment Summary for Part 2 </h1>
        <div>
          <p>
Total Cost $
            {this.calculatePayment()}
          </p>
          <p>
Total Payment = $
            {parseFloat(this.state.payment - this.calculatePayment()).toFixed(2)}
          </p>
        </div>
        <Button onClick={() => this.props.transition('finish')} color="success" id="continue">
               Continue
        </Button>
      </div>
    );
  }
}

export default PaymentSummaryPart2;
