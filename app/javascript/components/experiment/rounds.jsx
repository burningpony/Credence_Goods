import React, { Component } from 'react';

import {Button} from '@bootstrap-styled/v4';
class Rounds extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.updatePairRound(this.props.pair.id,{round:(this.props.pair.round+1)})
    this.props.stopTimer()
  }

  render (){
      return (
      <div>
        <h2>Round {this.props.pair.round}</h2>
        <p>To Start The next round click on the button bellow</p>
        <Button onClick={()=> this.props.transition("sets")} color="success">
          Start Next Round
        </Button>
      </div>
    );
  }
}


export default Rounds;
