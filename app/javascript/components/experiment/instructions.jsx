import React, { Component } from 'react';
import {Button} from '@bootstrap-styled/v4';
import CustomerInstructions from './customerInstructions';
import ExpertInstructions from './expertInstructions';

class Instructions extends Component{

  constructor(props) {
    super(props)
    this.renderInstructions = this.renderInstructions.bind(this)
  }

  renderInstructions() {
    if(this.props.user.role == 'A') {
        return (<CustomerInstructions transition={this.props.transition} role={this.props.user.role}></CustomerInstructions>)
    } else {
        return (<ExpertInstructions transition={this.props.transition} role={this.props.user.role}></ExpertInstructions>)
    }
  }

  render(){ return(
    <div>
      {this.renderInstructions()}
    </div>
  )};
}

export default Instructions;
