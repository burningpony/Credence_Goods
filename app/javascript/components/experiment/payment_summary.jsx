import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import { gss } from '../helpers/function';
import math from "mathjs";
import {costOfCoordinate,costOfPoint} from './constants'
import { getPayment } from '../actions/user_actions';

class PaymentSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
        payment:0
    }
  }

  componentDidMount() {
    this.getPayment();
  }

  getPayment = () => {
    const { part, user } = this.props;
    getPayment( user.id, part ).then((response) => {
      console.log(response);
      this.setState({payment: response });
    });
  }

  render() {
    return (
      <div>
          <h1 id="title"> Payment Summary for Part 1 </h1>
            <div>
                <p>For each function payment will be:</p>
                <p>Payment = Actual Maximum – ⎢Predicted – Actual ⎢ – Cost of Coordinates - Cost of Points</p>
                <p>Total Payment = ${parseFloat(this.state.payment).toFixed(2)}</p>
            </div>
            <Button onClick={() => this.props.transition('quiz2')} color="success" id="continue">
               Continue
            </Button>
      </div>
    );
  }
}

export default PaymentSummary;
