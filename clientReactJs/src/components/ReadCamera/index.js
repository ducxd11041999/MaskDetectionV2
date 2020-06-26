import React , {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './Style'
import WebcamCapture from './readCam'
class ReadCamera extends  Component{
   render(){
    const {classes, onCap} = this.props;
     return(
      <div className = {classes.root}>
          <WebcamCapture onCap = {onCap}/> 
      </div>
     )
   }
 }

 export default withStyles(styles)(ReadCamera)
