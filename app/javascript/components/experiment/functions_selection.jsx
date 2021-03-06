import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FunctionGraph from '../../containers/experiment/function_graph';

class FunctionsSelection extends Component {
  static propTypes() {
    return {
      viewMode: PropTypes.boolean.isRequired, // function_id
      part: PropTypes.string.isRequired,
      groupId: PropTypes.number.isRequired,
      round: PropTypes.number.isRequired,
    };
  }

  
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.mathFunctions.map((func, i) => (
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
            round={this.props.round}
            part={this.props.part}
          />

        </div>
      ))}
    </div>
    );
  }
}

export default FunctionsSelection;
