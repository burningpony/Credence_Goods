import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import ActionCableConsumer from '../react-cable/ActionCableConsumer';
import { cable } from '../app';

class Rounds extends Component {
  constructor(props) {
    super(props);

    // binding functions
    this.onConnected = this.onConnected.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.renderContinueButton = this.renderContinueButton.bind(this);
    this.continueFunction = this.continueFunction.bind(this);
    this.requestFormat = this.requestFormat.bind(this);
  }

  componentDidMount() {
    this.props.updatePairRound(this.props.pair.id, { round: (this.props.pair.round + 1) });
    this.props.stopTimer();
  }

  onConnected() {

  }

  requestFormat(data) {
    return {
      pair_id: this.props.pair.id,
      data,
    };
  }

  continueFunction() {
    this.props.transition('sets');
    this.refs.RoundChannel.send(this.requestFormat(null));
  }

  onReceived(data) {
    if (this.props.user.role == 'A') {
      this.props.transition('sets');
    }
  }

  renderContinueButton() {
    if (this.props.user.role == 'A') {
      return (<div />);
    }
    return (
      <Button onClick={() => this.continueFunction()} color="success">
          Start Next Round
      </Button>
    );
  }

  render() {
    return (
      <div>
        <ActionCableConsumer
          channel={{ channel: 'RoundChannel', pair_id: this.props.pair.id }}
          onReceived={this.onReceived}
          onConnected={this.onConnected}
          ref="RoundChannel"
          cable={cable}
        />
        <h2>
Round
          {this.props.pair.round}
        </h2>
        <p>To Start The next round click on the button bellow</p>
        {this.renderContinueButton()}

      </div>
    );
  }
}


export default Rounds;
