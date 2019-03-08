import React from 'react';
import FunctionsSelection from '../../containers/experiment/function_selection';
import BrowseWeb from './browse_web';

const Part1 = ({ transition }) => (
  <div>
    <h1>Part 1</h1>
    <BrowseWeb>
      <FunctionsSelection part={1} />
    </BrowseWeb>
    <button onClick={transition} type="button">
      Continue
    </button>
  </div>
);



export default Part1;
