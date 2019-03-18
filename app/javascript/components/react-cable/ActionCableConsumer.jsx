import React, { Component } from 'react';
//person b = expert
//person a = customer
class ActionCableConsumer extends Component {
    
    constructor(props){
        super(props)
        //binding methods
        this.setup = this.setup.bind(this)
    }

    //life cycle 
    componentWillMount() {
        if (this.props.cable) {
          this.setup()
        }
    }

    componentWillUnmount() {
        if (!this.props.cable && this.cable) {
            this.props.cable.subscriptions.remove(this.cable)
        }
    }

    //methods
    setup(){
        const _props = this.props
        const onReceived = _props.onReceived
        const onInitialized = _props.onInitialized
        const onConnected = _props.onConnected
        const onDisconnected = _props.onDisconnected
        const onRejected = _props.onRejected

        this.cable = this.props.cable.subscriptions.create(this.props.channel, {
            received:(data) => {
                onReceived && onReceived(data)
            },
            initialized:() => {
                onInitialized && onInitialized()
            },
            connected:() => {
                onConnected && onConnected()
            },
            disconnected:() => {
                onDisconnected && onDisconnected()
            },
            rejected:() => {
                onRejected && onRejected()
            }
        })
    }

    send(data) {
        if (!this.cable) {
          throw new Error("ActionCable component unloaded")
        }
    
        this.cable.send(data)
    }
    
    perform(action, data) {
        if (!this.cable) {
            throw new Error("ActionCable component unloaded")
        }

        this.cable.perform(action, data)
    }
    
    render () {
        return  (<div></div>)
    }
}

export default ActionCableConsumer;