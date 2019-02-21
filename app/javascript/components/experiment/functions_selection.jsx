import FunctionGraph from './function_graph';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { connect } from 'react-redux';
// import { setState } from '../actions/experiment_actions';

class FunctionsSelection extends Component {
  
  constructor(props) {
    super(props);    
  }

  render () {
    return (<div>
      {this.props.mathFunctions.map((func, i) => (
        <div key={i}>
          <h2>
            Function
            {' '}{func.representation}
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
          />

        </div>
      ))}
    </div>
    );
    }
}
function mapStateToProps(state) {
  return {
    mathFunctions: state.functions.toJS()
  }
}
export default connect(mapStateToProps,null)(FunctionsSelection);
