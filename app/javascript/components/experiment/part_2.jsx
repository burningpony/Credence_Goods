import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { Button } from '@bootstrap-styled/v4';
import _ from 'lodash';
import FunctionsSelection from '../../containers/experiment/function_selection';
import BrowseWeb from './browse_web';
import ActionCableConsumer from '../react-cable/ActionCableConsumer';
import { cable } from '../app';

class Part2 extends Component {
  constructor(props) {
    super(props);
    this.props.startTimer();

    const viewMode = (this.props.user.role == 'A');
    this.state = {
      viewMode,
      x: 0,
      y: 0,
    };
    this.debounceMouse = {};
    // binding functions
    this.sendChanges = this.sendChanges.bind(this);
    this.requestFormat = this.requestFormat.bind(this);
    this.onConnected = this.onConnected.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.backToGroups = this.backToGroups.bind(this);
    this.backToGroupsButton = this.backToGroupsButton.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.goToRoundPage = this.goToRoundPage.bind(this);
    this.mouseMonitor = this.mouseMonitor.bind(this);
    this.cursorPosition = this.cursorPosition.bind(this);
  }

  // the expert will also share his scrolling
  componentDidMount() {
    if (!this.state.viewMode) {
      window.addEventListener('scroll', this.handleScroll);
      this.debounceMouse = _.debounce((event) => {
        this.mouseMonitor(event);
      }, 50);
      window.addEventListener('mousemove', this.debounceMouse);
    }
  }

  componentWillUnmount() {
    if (!this.state.viewMode) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('mousemove', this.debounceMouse);
    }
  }

  componentDidUpdate(prevProps) {
    // Any time the functions.response changes , it will update througth the WS
    if (this.props.user.role == 'B') {
      this.sendChanges(this.props.functions);
    }
    return false;
  }

  onReceived(data) {
    if (this.props.user.role == 'A') {
      if (data.action == 'function_change') {
        this.props.setFunctions(fromJS(data.data));
      } else if (data.action == 'back_to_groups') {
        this.props.transition('sets');
      } else if (data.action == 'scrolling') {
        window.scrollTo(0, data.data);
      } else if (data.action == 'new_round') {
        this.props.transition('rounds');
      } else if (data.action == 'mouse_move') {
        this.setState({ x: data.data.x, y: data.data.y });
      } else {
        this.props.transition('payment_part2');
      }
    }
  }

  onConnected(data) {

  }

  handleScroll(event) {
    this.refs.FunctionResponsesChannel.perform('scrolling', this.requestFormat(window.scrollY));
  }

  mouseMonitor(event) {
    const data = {
      x: event.pageX,
      y: event.pageY,
    };
    this.refs.FunctionResponsesChannel.perform('mouse_move', this.requestFormat(data));
  }

  sendChanges(response) {
    this.refs.FunctionResponsesChannel.send(this.requestFormat(response));
  }

  requestFormat(data) {
    return {
      pair_id: this.props.pair.id,
      data,
    };
  }

  backToGroups() {
    this.props.transition('sets');
    this.refs.FunctionResponsesChannel.perform('notify_back', this.requestFormat({}));
  }

  finishPart() {
    this.props.transition('payment_part2');
    this.refs.FunctionResponsesChannel.perform('finish', this.requestFormat({}));
  }

  goToRoundPage() {
    this.props.transition('rounds');
    this.refs.FunctionResponsesChannel.perform('new_round', this.requestFormat({}));
  }

  // render functions
  drawCursor() {
    if (this.state.viewMode) {
      return (<img style={this.cursorPosition()} ref="cursor" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAMAAACTKxybAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJdnBBZwAAACAAAAAgAIf6nJ0AAAAtUExURUxpcQECEAABDgIFFgABDwAADgECEQIEFQECEgMFGP////T19+Tk5tbW2Lu7w/64qcAAAAAKdFJOUwC95zbT9LRNnhpZwYIeAAAAWUlEQVQI103OSw7AIAgEUEW0Laj3P24H/M6KF8iEQCmcULxEconkEnBk2HIsDUxNqGtiaEEqtAE5FAUWg+Yu8RltmhNLZQfmULoUW0XMAavG+/fS5ODjFwc/pqUD3BylxA0AAAAASUVORK5CYII=" />);
    }
  }

  cursorPosition() {
    return { top: `${this.state.y}px`, left: `${this.state.x}px`, position: 'absolute' };
  }

  backToGroupsButton() {
    if (this.state.viewMode) {
      return (<div />);
    }
    return (
      <Button onClick={this.backToGroups} color="success" name="groups">
      Back to groups
      </Button>
    );
  }

  renderRoundOrFinish() {
    if ((this.props.group.number_of_rounds > 1 && this.props.pair.round < this.props.group.number_of_rounds) && !this.state.viewMode) {
      return (
        <Button onClick={() => this.goToRoundPage()} color="success" disabled={this.props.viewMode} name="round">
        Another Round
        </Button>
      );
    }
    if (!this.state.viewMode) {
      return (
        <Button onClick={() => this.finishPart()} color="success" disabled={this.props.viewMode} name="finish">
          Finish
        </Button>);
    }
    return (<div />);
  }

  render() {
    return (
      <div>
        <h1>Part 2</h1>
        {this.drawCursor()}
        <BrowseWeb>
          <ActionCableConsumer
            channel={{ channel: 'FunctionResponsesChannel', pair_id: this.props.pair.id }}
            onReceived={this.onReceived}
            onConnected={this.onConnected}
            ref="FunctionResponsesChannel"
            cable={cable}
          />
          <FunctionsSelection viewMode={this.state.viewMode} part={2} round={this.props.pair.round} />
        </BrowseWeb>

        {this.backToGroupsButton()}
        {this.renderRoundOrFinish()}

      </div>);
  }
}

export default Part2;
