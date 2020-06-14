import React , {Component, useEffect} from 'react'
import Webcam from "react-webcam";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './Style'
//import callApi from './../../utils/Call_api'
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);


    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
      const interval = setInterval(() => {
        console.log("captured");
        capture();
      }, 3000);
      return () => clearInterval(interval);
    }, [capture]);
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          height={720}
          width={1280}
          screenshotFormat="image/jpg"
          videoConstraints={videoConstraints}
        />

        <Button variant="contained" onClick={capture} color = 'secondary'>Capture photo</Button>
        {
          imgSrc && (
          <img alt = "System not display your face"
            src={imgSrc}
          />
        )}
      </>
    );
  };

 class ReadCamera extends  Component{
   render(){
    const {classes} = this.props;
     return(
      <div className = {classes.root}>
          <WebcamCapture /> 
      </div>
     )
   }
 }

 export default withStyles(styles)(ReadCamera)
