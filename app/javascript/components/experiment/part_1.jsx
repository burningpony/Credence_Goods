import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../actions/experiment_actions';
import FunctionsSelection from './functions_selection';
import BrowseWeb from './browse_web';

const Part1 = ({ transition }) => (
  <div>
    <h1>Part 1</h1>
    <BrowseWeb>
      <FunctionsSelection />
    </BrowseWeb>
    <button onClick={transition} type="button">
      Continue
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('partner_matching')),
});

export default connect(null, mapDispatchToProps)(Part1);
