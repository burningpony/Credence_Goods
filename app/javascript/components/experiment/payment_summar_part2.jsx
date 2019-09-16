import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import math from 'mathjs';
import { gss } from '../helpers/function';
import { costOfCoordinate, costOfPoint } from './constants';
import { getPayment } from '../actions/user_actions';
import { finishExperiment } from '../actions/user_pair_actions'
class PaymentSummaryPart2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
    };
  }

  componentDidMount() {
    this.getPayment();
  }

  getPayment = () => {
    const { part, user } = this.props;

    getPayment(user.id, part).then((response) => {
      console.log(response);
      this.setState({payment: response });
    });
  }

  finish = () => {
    const { user } = this.props;
    finishExperiment(user.id).then((data)=>{
      this.props.transition('finish')
    })
  }

  render() {
    const { part } = this.props;
    return (
      <div>
        <h1 id="title"> Payment Summary for Part {part} </h1>
        <div>
          <p>
          Payment = $
            { parseFloat( this.state.payment ).toFixed(2) }
          </p>
        </div>
        <Button onClick={this.finish} color="success" id="continue">
               Continue
        </Button>
      </div>
    );
  }
}

export default PaymentSummaryPart2;
