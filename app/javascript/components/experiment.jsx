import styled from 'styled-components';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import GroupSelect from './group_select';
import SetSelect from './set_select';
import Part1 from '../containers/experiment/part_1';
import Part2 from '../containers/experiment/part_2';
import Quiz1 from '../containers/experiment/quiz_1';
import Quiz2 from '../containers/experiment/quiz_2';
import TestFunctions from '../containers/experiment/test_functions';
import PartnerMatching from '../containers/experiment/partner_matching';
import Instructions from '../containers/experiment/instructions';
import { state as getState } from './selectors/experiment_selectors';
import { hot } from 'react-hot-loader'
import Timer from '../containers/experiment/timer'
const ExperimentTheme = styled.section`
  padding: 4em;
  background: #f1f1f1;
`;

class ExperimentComponent extends Component{
  render () {
      switch (this.props.experimentState) {
        case 'sets':
          return (<SetSelect />);
        case 'instructions':
          return (<Instructions />);
        case 'part1':
          return (<Part1 />);
        case 'partner_matching':
          return (<PartnerMatching />);
        case 'part2':
          return (<Part2 />);
        case 'quiz1':
          return (<Quiz1 />);
        case 'quiz2':
          return (<Quiz2 />);
        case 'test':
          return (<TestFunctions />);
        default:
          return (<GroupSelect />);
      }
  };
}

const App = ({ experimentState }) => (
  <ExperimentTheme>
    <Timer></Timer>
    <ExperimentComponent experimentState={experimentState}></ExperimentComponent>
  </ExperimentTheme>
);

const mapStateToProps = state => ({
  experimentState: getState(state),
});

export default hot(module)(connect(mapStateToProps)(App));
