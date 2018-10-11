import React from 'react';
import FunctionGraph from './function_graph';

// import { connect } from 'react-redux';
// import { setState } from '../actions/experiment_actions';
const functions = [
  'sin(x)',
  'cos(x)',
  'cos(x) * 2 / 4',
  'cos(x) * 2',
];

const FunctionsSelection = () => (
  <div>
    {functions.map((func, i) => (
      <div key={func}>
        <h2>
          Function
          {' '}
          {i + 1}
        </h2>

        <FunctionGraph function={func} />

      </div>
    ))}
  </div>
);

export default FunctionsSelection;
