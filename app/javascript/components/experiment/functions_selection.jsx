import React from 'react';
import FunctionGraph from './function_graph';

// import { connect } from 'react-redux';
// import { setState } from '../actions/experiment_actions';
const functions = [
  {
    func: 'sin(x)', maxY: 1, maxX: 2, minY: -1, minX: -1,
  },
  {
    func: 'cos(x)', maxY: 1, maxX: 2, minY: -1, minX: -1,
  },
  {
    func: 'cos(x) * 2 / 4', maxY: 1, maxX: 2, minY: -1, minX: -1,
  },
  {
    func: 'cos(x) * 2', maxY: 1, maxX: 2, minY: -1, minX: -1,
  },
];

const FunctionsSelection = () => (
  <div>
    {functions.map((func, i) => (
      <div key={func.func}>
        <h2>
          Function
          {' '}
          {i + 1}
        </h2>

        <FunctionGraph
          func={func.func}
          maxY={func.maxY}
          maxX={func.maxX}
          minY={func.minY}
          minX={func.minX}
        />

      </div>
    ))}
  </div>
);

export default FunctionsSelection;
