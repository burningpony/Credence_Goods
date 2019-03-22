import React,{Component} from 'react';

class TimerDisplay extends Component {
    render() {
      return (
        <div>
          <h1 style={{ fontSize: 20, float:'right' }}>Time Remaining - {this.props.value}:{this.props.seconds}</h1>
        </div>
      );
    }
}

class Timer extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            value:0,
            seconds:0,
            started: false
        }
        this.startCountDown = this.startCountDown.bind(this)
        this.tick = this.tick.bind(this)
        this.getSeconds = this.getSeconds.bind(this)
    }

    componentDidUpdate(prevProps) {
        // start conditions 
        if(this.props.user.timer === true  && !this.state.started){
            this.startCountDown()
            this.setState({started:true})
        } else if(this.props.user.timer === false && this.state.started){
            clearInterval(this.intervalHandle) 
            this.setState({started:false})
            this.setState({
                value:15,
                seconds:this.getSeconds(0)
            })
        }
    }

    tick(){
        if(this.state.seconds == 0){
            this.setState({
                value:this.state.value-1,
                seconds:this.getSeconds(59)
            })
        } else {
            this.setState({
                seconds:this.getSeconds(this.state.seconds-1)
            }) 
        }
        //time over
        if(this.state.value == 0 && this.state.seconds == 0){
            this.props.toastManager.add('You finished The experiment!!!', { appearance: 'success' });
            if(this.props.user.part==2){
                this.props.transition('rounds')
            }else{
                this.props.transition('partner_matching')
            }
            clearInterval(this.intervalHandle)
        }

    }

    getSeconds(number){
        if(number <10){
            return "0"+number
        }
        return number
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        
        this.setState({
            value:15,
            seconds:this.getSeconds(0)
        })
      }

      render (){
          return (<TimerDisplay value={this.state.value} seconds={this.state.seconds} />)
      }
}
export default Timer;