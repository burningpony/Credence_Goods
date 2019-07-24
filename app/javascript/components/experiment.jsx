import styled from 'styled-components';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastConsumer, ToastProvider, withToastManager } from 'react-toast-notifications';
import GroupSelect from './group_select';
import SetSelect from './set_select';
import Part1 from '../containers/experiment/part_1';
import Part2 from '../containers/experiment/part_2';
import Quiz1 from '../containers/experiment/quiz_1';
import Quiz2 from '../containers/experiment/quiz_2';
import Rounds from '../containers/experiment/rounds';
import TestFunctions from '../containers/experiment/test_functions';
import PartnerMatching from '../containers/experiment/partner_matching';
import Instructions from '../containers/experiment/instructions';
import PaymentSummary from '../containers/experiment/payment_summary';

import { state as getState } from './selectors/experiment_selectors';
import Timer from '../containers/experiment/timer';


const ExperimentTheme = styled.section`
  padding: 4em;
  background: #f1f1f1;
`;

class ExperimentComponent extends Component {
  constructor(props) {
    super(props);
    // binding
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      this.props.toastManager.add('You tried to leave the experiment', { appearance: 'warning' });
      return '';
    }.bind(this);
  }

  renderPage() {
    switch (this.props.experimentState) {
      case 'sets':
        return (<SetSelect toastManager={this.props.toastManager} />);
      case 'instructions':
        return (<Instructions toastManager={this.props.toastManager} />);
      case 'part1':
        return (<Part1 toastManager={this.props.toastManager} />);
      case 'partner_matching':
        return (<PartnerMatching toastManager={this.props.toastManager} />);
      case 'part2':
        return (<Part2 toastManager={this.props.toastManager} />);
      case 'quiz1':
        return (<Quiz1 toastManager={this.props.toastManager} />);
      case 'quiz2':
        return (<Quiz2 toastManager={this.props.toastManager} />);
      case 'test':
        return (<TestFunctions toastManager={this.props.toastManager} />);
      case 'rounds':
        return (<Rounds toastManager={this.props.toastManager} />);
      case 'payment':
        return (<PaymentSummary toastManager={this.props.toastManager} />);
      default:
        return (<GroupSelect toastManager={this.props.toastManager} />);
    }
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

const ExperimentWithToasts = withToastManager(ExperimentComponent);
const TimerWithToast = withToastManager(Timer);
const App = ({ experimentState }) => (
  <ExperimentTheme>
    <ToastProvider>

      <TimerWithToast>
        <ToastConsumer />
      </TimerWithToast>

      <ExperimentWithToasts experimentState={experimentState}>
        <ToastConsumer />
      </ExperimentWithToasts>

    </ToastProvider>
  </ExperimentTheme>
);

const mapStateToProps = state => ({
  experimentState: getState(state),
});

export default hot(module)(connect(mapStateToProps)(App));
