import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import FunctionGraph from '../../containers/experiment/function_graph';

const mathFunctions = [
  {
    id: 0,
    representation: 'x',
    max_y: 1,
    max_x: 1,
    min_y: 0,
    min_x: 0,
  },
  {
    representation: '(x*x)',
    max_y: 1,
    max_x: 1,
    min_y: 0,
    min_x: 0,
  },
];

class TestFunctions extends Component {
  render() {
    return (
      <div>
        <h1 id="#title">Tests functions</h1>
        <div>
          {mathFunctions.map((func, i) => (
            <div key={i} id="function">
              <h2>
                Function 
{' '}
{func.representation}
                {i + 1}
              </h2>

              <FunctionGraph
                id={func.id}
                func={func.representation}
                maxY={func.max_y}
                maxX={func.max_x}
                minY={func.min_y}
                minX={func.min_x}
                disabled={func.saved}
                responses={func.responses}
                viewMode={this.props.viewMode}
              />
            </div>
          ))}
        </div>

        <Button
          onClick={() => this.props.transition()}
          name="continue"
          color="success"
        >
          Continue to select a group
        </Button>
      </div>
    );
  }
}

export default TestFunctions;
