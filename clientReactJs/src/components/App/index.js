import React, {Component} from 'react';
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
//import Notification from './../Notifications/index';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../commons/theme'
//import Stream from './../StreamVideo/index'
import ReadCamera from './../ReadCamera/index'

class App extends Component{
  onCap = (param) =>{
    console.log(param)
  }
  render(){
    const {classes} = this.props;
    return (
      <ThemeProvider theme = {theme}>
        <div className = {classes.shape}>
          {/* <Notification/>  */}
           <
            ReadCamera 
            onCap = {this.onCap}
          />
          {/* <Stream />  */}
        </div>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles)(App);
