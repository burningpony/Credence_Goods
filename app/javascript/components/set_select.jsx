import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map as iMap, fromJS } from 'immutable';
import {
  Card, Row, Col, Button, Container,
} from '@bootstrap-styled/v4';
import { user as userSelector } from './selectors/user_selectors';
import { setState } from './actions/experiment_actions';
import { fetchFunctions, MARK_AS_SELECTED, SET_CURRENT_FUNCTION_SET } from './actions/functions_actions';
import ActionCableConsumer from './react-cable/ActionCableConsumer';
import { cable } from './app';

class SetSelect extends Component {
  static propTypes = {
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };

    // binding functions
    this.requestFormat = this.requestFormat.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.onConnected = this.onConnected.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onConnected() {

  }

  onReceived(data) {
    console.log(data);
    if (this.props.user.role == 'A') {
      this.handleSubmit(data.data);
    }
  }

  onSubmit(set) {
    this.props.selectSet(fromJS(set));
    this.props.markAsSelected(set.id);
    this.props.fetchFunctions(this.props.group.id, set.id);
    this.props.transition(`part${this.props.pair.part}`);
    if (this.props.pair.part == 2 && this.props.user.role == 'B') {
      this.sendChanges(set);
    }
  }

  sendChanges(data) {
    this.refs.GroupChannel.send(this.requestFormat(data));
  }

  requestFormat(data) {
    return {
      group_id: this.props.pair.id,
      data,
    };
  }

  renderCard(index, group) {
    // not render the button on part 2 for player A
    if (this.props.pair.part == 2 && this.props.user.role == 'A') {
      return (
        <Card>
          <h2>
Group
            {` ${index + 1}`}
          </h2>
        </Card>
      );
    }

    // default option
    return (
      <Card onClick={() => this.handleSubmit(group)} id="group-option">
        <h2>
Group
          {` ${index + 1}`}
        </h2>
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <ActionCableConsumer
          channel={{ channel: 'GroupChannel', group_id: this.props.pair.id }}
          onReceived={this.onReceived}
          onConnected={this.onConnected}
          ref="GroupChannel"
          cable={cable}
        />
        <Row>
          <h1>Select a Group of functions</h1>
        </Row>
        <Row>
          {this.props.sets.map((group, index) => (
            <Col xs="4" key={index}>
              {this.renderCard(index, group)}
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.toJS(),
  group: state.group.toJS(),
  sets: state.functionSets.toJS(),
  pair: state.pair.toJS(),
});

const mapDispatchToProps = dispatch => ({
  selectSet: set => dispatch({ type: SET_CURRENT_FUNCTION_SET, currentSet: set }),
  markAsSelected: setId => dispatch({ type: MARK_AS_SELECTED, id: setId }),
  fetchFunctions: (groupId, setId) => dispatch(fetchFunctions(groupId, setId)),
  transition: state => dispatch(setState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelect);
