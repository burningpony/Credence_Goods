import FunctionsSelection from '../../containers/experiment/function_selection';
import BrowseWeb from './browse_web';
import ActionCableConsumer  from '../react-cable/ActionCableConsumer'
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import {cable} from '../app'
import {Button,Col,Row,Alert} from '@bootstrap-styled/v4';

class Part2 extends Component {

  constructor (props) {
    super(props);
    this.props.startTimer()

    const viewMode = (this.props.pair.player == 'A')
    this.state = {
      viewMode: viewMode
    }
    //binding functions
    this.sendChanges = this.sendChanges.bind(this)
    this.requestFormat = this.requestFormat.bind(this)
    this.onConnected = this.onConnected.bind(this)
    this.onReceived = this.onReceived.bind(this)
    this.backToGroups = this.backToGroups.bind(this)
    this.backToGroupsButton = this.backToGroupsButton.bind(this)

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
      if(data.action == 'function_change'){
        this.props.setFunctions(fromJS(data.data))
      } else if(data.action == 'back_to_groups'){
        this.props.transition("sets")
      }else{
        this.props.transition("finished")
      }
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

  backToGroups(){
    this.props.transition("sets")
    this.refs.FunctionResponsesChannel.perform('notify_back',this.requestFormat({}))
  }

  finishPart(){
    this.props.transition("finished")
    this.refs.FunctionResponsesChannel.perform('finish',this.requestFormat({}))
  }

  //render functions
  
  backToGroupsButton(){
    if(this.state.viewMode){
      return (<div></div>)
    }
    return (<Button onClick={this.backToGroups} color="success">
      Back to groups
    </Button>)
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

      {this.backToGroupsButton()}
      <Button onClick={()=> this.finishPart()} color="success">
        Finish
      </Button>
    </div>);
  }
}

export default Part2;
