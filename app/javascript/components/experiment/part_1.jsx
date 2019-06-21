import React, { Component } from 'react';
import { Button } from '@bootstrap-styled/v4';
import FunctionsSelection from '../../containers/experiment/function_selection';
import BrowseWeb from './browse_web';

class Part1 extends Component {
  constructor(props) {
    super(props);
    this.props.startTimer();
  }

  render() {
    return (
      <div>
        <h1>Part 1</h1>
        <BrowseWeb toastManager={this.props.toastManager}>
          <FunctionsSelection part={1} />
        </BrowseWeb>

        <Button onClick={() => this.props.transition('sets')} color="success">
          Back to groups
        </Button>

        <Button onClick={() => this.props.transition('quiz2')} color="success">
          Continue
        </Button>

      </div>
    );
  }
}


export default Part1;
