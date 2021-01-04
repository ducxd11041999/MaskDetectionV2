import React , {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './Style'
import WebcamCapture from './readCam'
// import MediaQuery from 'react-responsive'
class ReadCamera extends  Component{
  render(){
    const {classes, onCap, onStep, onReplay, onImageResult, onBlock} = this.props;
    return(
      <div className = {classes.root}>
          <WebcamCapture onCap = {onCap} onStep = {onStep}
            onReplay = {onReplay}
            onImageResult = {onImageResult}
            onBlock = {onBlock}
            deviceW =  {1500}
            deviceH = {650}
          /> 
      </div>
    )
  }
}

export default withStyles(styles)(ReadCamera)
