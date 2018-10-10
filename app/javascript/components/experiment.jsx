import styled from 'styled-components';
import React from 'react';
import { connect } from 'react-redux';
import GroupSelect from './group_select';
import Part1 from './experiment/part_1';
import Part2 from './experiment/part_2';
import PartnerMatching from './experiment/partner_matching';
import Instructions from './experiment/instructions';
import { state as getState } from './selectors/experiment_selectors';

const ExperimentTheme = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const ExperimentComponent = (experimentState) => {
  switch (experimentState) {
    case 'instructions':
      return (<Instructions />);
    case 'part1':
      return (<Part1 />);
    case 'partner_matching':
      return (<PartnerMatching />);
    case 'part2':
      return (<Part2 />);
    default:
      return (<GroupSelect />);
  }
};

const App = ({ experimentState }) => (
  <ExperimentTheme>
    {ExperimentComponent(experimentState)}
  </ExperimentTheme>
);

const mapStateToProps = state => ({
  experimentState: getState(state),
});

export default connect(mapStateToProps)(App);
