import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../actions/experiment_actions';
import FunctionsSelection from './functions_selection';
import BrowseWeb from './browse_web';

const Part2 = ({ transition }) => (
  <div>
    <h1>Part 2</h1>
    <BrowseWeb>
      <FunctionsSelection />
    </BrowseWeb>
    <button onClick={transition} type="button">
      Finish
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  transition: () => dispatch(setState('finished')),
});

export default connect(null, mapDispatchToProps)(Part2);
