import React, {Component} from 'react';
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
import Notification from './../Notifications/index';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../commons/theme'
//import Stream from './../StreamVideo/index'
import ReadCamera from './../ReadCamera/index'
import FormDialog from './../FormInfor/index'
import callApi from './../../utils/Call_api'
class App extends Component{
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
    mask: false,
    displayForm: false,
    openLog: true
    };
  }
  onCap = (param) =>{
    // recive status mask
    var par  = param === 'True'? true: false;
    console.log(typeof par)
    this.setState({
      mask: par,
      openLog: true
    }) 
  }
  onClickNext = (param) =>{
    // click Ok from dialog
      if(this.state.mask){
        if(param){
          this.setState({
            displayForm: true,
            openLog: false
          })
        }
        else{
          this.setState({
            displayForm: false,
            openLog: false
          })
        }
      }
      else{
        this.setState({
          displayForm: false,
          openLog: false
        })
      }
  }
  onInformation = (param) =>{
    // recive data from form
    console.log(param)
    if(param){
    callApi('/usr_info', 'POST', param).then(res => {
        console.log(res)
    })
  }

  }
  onCloseForm = () =>{
    this.setState({
      displayForm: false
    })
  }
  render(){
    const {mask} = this.state
    let {classes} = this.props
    return (
      <ThemeProvider theme = {theme}>
        <div className = {classes.noCroll} ref={this.wrapper}>
          <div>
            <Notification mask = {mask} openLog = {this.state.openLog} onClickNext= {this.onClickNext} 
            />
            <FormDialog onInformation = {this.onInformation} 
              openForm = {this.state.displayForm}
              onCloseForm = {this.onCloseForm}/>
            <ReadCamera onCap = {this.onCap}/>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles)(App);
