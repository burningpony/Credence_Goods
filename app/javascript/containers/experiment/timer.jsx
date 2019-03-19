import React,{Component} from 'react';
import { connect } from 'react-redux';
import { setState } from '../../components/actions/experiment_actions';
import { state as getState } from '../../components/selectors/experiment_selectors';

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
            part1:false,
            part2:false
        }
        this.startCountDown = this.startCountDown.bind(this)
        this.tick = this.tick.bind(this)
    }

    componentDidUpdate(prevProps) {
        // Any time the functions.response changes , it will update througth the WS 
        if(this.props.user.part_1_start && !this.state.part1){
            this.setState({value:15,
                seconds:0,part1:true})
                this.startCountDown()
        } else if(this.props.user.part_2_start && !this.state.part2) {
            clearInterval(this.intervalHandle)
            this.setState({value:30,
                seconds:0,part2:true})
                this.startCountDown()
        } else if(this.props.experimentState == "finished"){
            clearInterval(this.intervalHandle)
            this.setState({value:0,
                seconds:0})
        }
    }

    tick(){
        if(this.state.seconds == 0){
            this.setState({
                value:this.state.value-1,
                seconds:59
            })
        } else {
            this.setState({
                seconds:this.state.seconds-1
            }) 
        }
        //time over
        if(this.state.value == 0 && this.state.seconds == 0){
            this.props.toastManager.add('You finished The experiment!!!', { appearance: 'success' });
            this.props.transition('partner_matching')
            clearInterval(this.intervalHandle)
        }

    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.value;
        this.secondsRemaining = time * 60;
        this.setState({
          isClicked : true
        })
      }

      render (){
          return (<TimerDisplay value={this.state.value} seconds={this.state.seconds} />)
      }
}

const mapDispatchToProps = dispatch => ({
    transition: (state) => dispatch(setState(state)),

});
  
const mapStateToProps = state => ({
    experimentState: getState(state),
    user: state.user.toJS(),
});
export default connect(mapStateToProps,mapDispatchToProps)(Timer)