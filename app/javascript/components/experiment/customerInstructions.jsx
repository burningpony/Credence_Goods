import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';

class CustomerInstructions extends Component {
  render() {
    return (
      <div>
        <h2>Instructions</h2>
        <h3 id="role">
You Will be the player:
          {' '}
          {this.props.role}
          {' '}
        </h3>
        <p>
          In this part of the experiment, you will be asked to predict the
          maximum values for up to 30 hidden functions during a 15-minute
          period. You will start with a blank graph for each function. To help
          you determine the maximum value of the function in the graph, you may
          purchase two types of information: Value Coordinates and Function
          Sample Points. Each value coordinate purchased will produce a gridline
          and the value of the gridline along the y-axis, and each function
          sample point purchased will reveal a point along the function. For
          your convenience, a mathematical algorithm will optimally select the
          best location of each function sample point you purchase.
        </p>
        <h2>Computer Interface:</h2>
        <p>
          During the 15 minutes of Part 1, you will select Groups for each of
          which you will do the prediction task. There will be 10 Groups to
          select from, and each Group may have a different number of function
          maximum values to predict. How many Groups you select and how many
          maximum value predictions you make within the 15 minutes is up to you.
          Once you select a group, you will be brought to a screen with one
          blank graph for each function included in that group. In the following
          example, assume you selected Group 1, which has 2 functions. You may
          purchase Value Coordinates and/or Function Sample Points prior to
          making your prediction of the maximum value of the function. Value
          coordinates and sample points purchased can always be increased in
          number prior to making your prediction. Once you feel you have
          purchased enough information, you may enter your prediction of the
          maximum value and click submit. In the example that follows, assume
          that you have chosen to purchase 3 value coordinates and 5 sample
          points for Function 1. Then you would see the graph below, and it
          would now be your task to predict the hidden maximum value of the
          function given the information you have purchased. The actual maximum
          will only be revealed once you submit your prediction.
        </p>
        <h2>Payment:</h2>
        <p>
          Your payment will be determined by the accuracy of your prediction and
          the cost of the information that you purchased before predicting. You
          will be paid as follows: Payment = Actual Maximum – |Predicted
          –Actual| – Cost of Coordinates - Cost of Points Where |Predicted
          –Actual| signifies the positive difference between Predicted and
          Actual. In the example above you purchased 3 Value Coordinates (1.20,
          .80, .40) for .30 and 5 Function Sample Points for .25. If the
          Function 1 above has an actual maximum value of 1.00 and you predicted
          that its maximum value was .90 then you would earn: Payment = 1.00 – |
          .90-1.00| - .30 - .25 = 1.00 – .10 - .30 - .25 = $0.35 But if Function
          1 has the actual maximum value of 1.00 and you predicted that its
          maximum value was 1.50 then you would earn: Payment = 1.00 –
          |1.50-1.00| - .30 - .25 = 1.00 – .50 - .30 - .25 = -$0.05 The most you
          can be paid is the actual maximum value. The closer your prediction is
          to the actual maximum, and the fewer coordinates and points you
          purchase before making your prediction, the more you will be paid.
        </p>
        <h2>Summary:</h2>
        <p>
          30 functions to predict in Groups containing various numbers of
          functions. Payment based on accuracy of prediction minus cost of
          information. Before starting the task, you will have 3 practice
          functions. You will not be paid for predicting the maximum for these 3
          practice functions.
        </p>
        <Button onClick={this.props.transition}>Continue</Button>
      </div>
    );
  }
}

export default CustomerInstructions;
