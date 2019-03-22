import React, { Component } from 'react';
import ActionCableConsumer from '../react-cable/ActionCableConsumer'
import { cable } from '../app'
import {Button,Col,Row,Alert} from '@bootstrap-styled/v4';
import { fromJS } from 'immutable';


class PartnerMatching extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pairSetted: false,
      player: this.props.user.role,
    };
    this.props.stopTimer()
    //binding functions
    this.onConnected = this.onConnected.bind(this)
    this.onReceived = this.onReceived.bind(this)
    this.requestFormat = this.requestFormat.bind(this)
    this.playerAlert = this.playerAlert.bind(this)
    this.transitionRole = this.transitionRole.bind(this)
  }


  onConnected(data) {
    if (!this.state.pairSetted) {
      this.refs.SimulationChannel.perform('request_pair', this.requestFormat({...this.props.user,group_id:this.props.group.id,round:1}))
    }
  }

  requestFormat(data) {
    return {
      room: this.props.user.id,
      data
    }
  }

  onReceived(data) {
    console.log(data)
    if(data.action == "request_pair") {
      const pair = data.data
      this.props.receivePair(fromJS({ ...pair, part:2}))
      if(pair.person_a_id > 0 && pair.person_b_id > 0){ //if the pair ist complete send confirmation
        this.refs.SimulationChannel.perform('confirm_pair', this.requestFormat(pair))
      }else{
        this.props.toastManager.add('You have to wait for your pair!', { appearance: 'warning' });
      }
    } else if(data.action == "confirm_pair") {
      this.setState({ pairSetted: true})
      this.props.toastManager.add('You Are Paired!', { appearance: 'success' });

    }
    
  }
  //html render methods

  playerAlert() {
    if (!this.state.pairSetted)
      return (<h1>Waiting the assignation</h1>)
    else
      return (<h1>You will be the player {this.state.player} ,Wait a moment for the pair user</h1>)
  }

  transitionRole() {
    if (this.state.player == 'B') {
      this.props.transition('quiz1')
    } else {
      this.props.transition('sets')
    }
  }

  render() {
    return (
      <Row>
          <Col sm="12">
            <h1>Matching Partners</h1>
            {this.playerAlert()}
            {/* <h2>Player A is selecting payment method for player B</h2>
            <h2>Player A is deciding if player B can make blind guesses</h2>
            <h2>Player A will watch player B response to questions</h2> */}
            <ActionCableConsumer
              channel={{ channel: 'SimulationChannel', room: this.props.user.id }}
              onReceived={this.onReceived}
              onConnected={this.onConnected}
              ref="SimulationChannel"
              cable={cable}
            />
          </Col>
        <Col sm="12">
          <Button onClick={this.transitionRole} type="button" disabled={!this.state.pairSetted}>
            Continue
          </Button>
        </Col>
      </Row>
    );
  }

}

export default PartnerMatching;
