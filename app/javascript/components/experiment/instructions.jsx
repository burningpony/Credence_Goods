import React, { Component } from 'react';
class Instructions extends Component{

  render(){ return(
    <div>
      <h2>
          Introduction
      </h2>
      <p>
          This is an experiment in decision-making. You will be required to complete the experiment on your own. You are not allowed to communicate with any other participant at any point during the course of the experiment. If you complete the experiment, you will be paid for the decisions you make in the task that you are assigned. You may withdraw from the experiment at any time.  If you withdraw from the experiment before its completion, you will only be paid $7 for having shown up today.  If you choose to remain in the experiment, then you should feel free to try to make as much money as you can. All responses and decisions will be anonymous and the only experimental data that will contain your identity will be your receipt of payment at the end of the experiment.
          Before we begin, please set your cell phones to silent. We ask that you not make calls or send text messages until the experiment is complete. We also ask that you not talk to other participants in the experiment until after the experiment is complete.
      </p>
      <h3>
          Basic Overview:
      </h3>
      <p>
        This experiment contains two parts. The nature of your task will be the same in both parts of the experiment and your decisions in completing this task will affect your earnings in both parts of the experiment.
      </p>
      <h3>
        Alternate Task:
      </h3>
      <p>
        At any time during the experiment, you may choose to browse the internet instead of completing the task that you are assigned.
      </p>
      <button onClick={this.props.transition}>
        Continue
      </button>
    </div>
  )};
}

export default Instructions;
