import React, {Component} from 'react';
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
import Notification from './../Notifications/index';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../commons/theme'
//import Stream from './../StreamVideo/index'
import ReadCamera from './../ReadCamera/index'
class App extends Component{
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
         mask: false
    };
  }
  onCap = (param) =>{
    var par  = param === 'True'? true: false;
    console.log(typeof par)
    this.setState({
      mask: par,
    }) 
  }
  // onRenderNotifications = () =>{
  //     return <Notification />
  // }
  render(){
    const {classes} = this.props;
    const {mask} = this.state
    return (
      <ThemeProvider theme = {theme}>
        <div className = {classes.shape} ref={this.wrapper}>
          <div>
           <Notification mask = {mask}/>
           <ReadCamera 
            onCap = {this.onCap}
          />
          </div>
          {/* <Stream />  */}
        </div>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles)(App);
