import React, { Component } from 'react';
import ActionCableConsumer from '../react-cable/ActionCableConsumer'
import { cable } from '../app'


class PartnerMatching extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pairSetted: false,
      player: " ",
    };

    //binding functions
    this.onConnected = this.onConnected.bind(this)
    this.onReceived = this.onReceived.bind(this)
    this.requestFormat = this.requestFormat.bind(this)
    this.playerAlert = this.playerAlert.bind(this)
    this.transitionRole = this.transitionRole.bind(this)
  }


  onConnected(data) {
    if (!this.state.pairSetted) {
      this.refs.SimulationChannel.perform('request_pair', this.requestFormat(this.props.user))
    }
  }

  requestFormat(data) {
    return {
      room: "pair_matching_" + this.props.user.id,
      data
    }
  }

  onReceived(data) {
    console.log("Pair Id", data.id)
    let player = 'B'
    if (data.person_a_id == this.props.user.id) {
      player = 'A'
    }

    this.props.receivePair({ ...data, player })

    this.setState({ pairSetted: true, player })
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
      this.props.transition('part2')
    } else {
      this.props.transition('quiz1')
    }
  }

  render() {
    return (
      <div>
        <h1>Matching Partners</h1>
        {this.playerAlert()}
        <h2>Player A is selecting payment method for player B</h2>
        <h2>Player A is deciding if player B can make blind guesses</h2>
        <h2>Player A will watch player B response to questions</h2>
        <ActionCableConsumer
          channel={{ channel: 'SimulationChannel', room: "pair_matching_" + this.props.user.id }}
          onReceived={this.onReceived}
          onConnected={this.onConnected}
          ref="SimulationChannel"
          cable={cable}
        />
        <button onClick={this.transitionRole} type="button" disabled={!this.state.pairSetted}>
          Continue
    </button>
      </div>
    );
  }

}

export default PartnerMatching;
