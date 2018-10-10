import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../actions/experiment_actions';
import FunctionsSelection from './functions_selection';
import BrowseWeb from './browse_web';

const Part2 = ({ transition }) => (
  <div>
    <h1>Matching Partners</h1>

    <h2>Player A is selecting payment method for player B</h2>
    <h2>Player A is deciding if player B can make blind guesses</h2>
    <h2>Player A will watch player B response to questions</h2>

    <button onClick={transition} type="button">
      Continue
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('part2')),
});

export default connect(null, mapDispatchToProps)(Part2);
