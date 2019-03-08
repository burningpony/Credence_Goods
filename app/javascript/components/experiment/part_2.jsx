import FunctionsSelection from '../../containers/experiment/function_selection';
import BrowseWeb from './browse_web';
import ActionCableConsumer  from '../react-cable/ActionCableConsumer'
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import {cable} from '../app'

class Part2 extends Component {

  constructor (props) {
    super(props);
    const viewMode = (this.props.pair.player == 'A')
    this.state = {
      viewMode: viewMode
    }
    //binding functions
    this.sendChanges = this.sendChanges.bind(this)
    this.requestFormat = this.requestFormat.bind(this)
    this.onConnected = this.onConnected.bind(this)
    this.onReceived = this.onReceived.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Any time the functions.response changes , it will update througth the WS 
    if(this.props.pair.player == 'B'){
      this.sendChanges(this.props.functions)
    }
    return false;
  }

  onReceived (data){
    if(this.props.pair.player == 'A'){
      this.props.setFunctions(fromJS(data.data))
    }
  }

  onConnected (data) {
  }

  sendChanges(response){
    this.refs.FunctionResponsesChannel.send(this.requestFormat(response))
  }

  requestFormat(data){
    return{
      pair_id:this.props.pair.id,
      data
    }
  }

  render () { return (
    <div>
      <h1>Part 2</h1>
      <BrowseWeb>
      <ActionCableConsumer
            channel={{channel:'FunctionResponsesChannel', pair_id:this.props.pair.id}}
            onReceived={this.onReceived}
            onConnected={this.onConnected}
            ref="FunctionResponsesChannel"
            cable={cable}
          />
        <FunctionsSelection viewMode={this.state.viewMode} part={2}/>
      </BrowseWeb>
      <button onClick={this.props.transition} type="button">
        Finish
      </button>
    </div>);
  }
}

export default Part2;
