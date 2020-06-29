import Webcam from "react-webcam";
import React from 'react'
import videoConstraints from './Setting'
import Button from '@material-ui/core/Button';
import callApi from './../../utils/Call_api'
import PropTypes from 'prop-types';
import styles from './Style'
import { withStyles } from '@material-ui/core/styles';
WebcamCapture.propTypes = {
  onCap: PropTypes.func,
};

WebcamCapture.defaultProps = {
  onCap: null,
};

function WebcamCapture(props) {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const {onCap, classes} = props;
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        var json = (`{ "img": ${JSON.stringify(imageSrc)}}`);
        var body = JSON.parse(json)
        callApi('/json', 'POST', body).then(res => {
          onCap(res.data)
        })
    }, [webcamRef, onCap]);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     console.log("captured");
    //     capture();
    //   }, 5000);
    //   return () => clearInterval(interval);
    // }, [capture]);
    return (
      <div>
        
        <Webcam
          audio={false}
          ref={webcamRef}
          height={620}
          width={1280}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        >
            
        </Webcam>
        <Button variant="contained" onClick={capture}
            color = 'secondary' className = {classes.btnCapture}>Check In
        </Button>
      </div>
    );
  };

  export default  withStyles(styles)(WebcamCapture);