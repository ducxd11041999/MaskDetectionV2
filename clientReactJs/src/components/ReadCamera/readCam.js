import Webcam from "react-webcam";
import React, {useEffect} from 'react'
import videoConstraints from './Setting'
//import Button from '@material-ui/core/Button';
// import callApi from './../../utils/Call_api'
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
    // const [replay, setReplay] = React.useState(false);
    const {onCap, onImageResult, onBlock} = props;
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        var json = (`{ "img": ${JSON.stringify(imageSrc)}}`);
        var body = JSON.parse(json)
        // callApi('/json', 'POST', body).then(res => {
        //   onCap(res.data)
        // })
        onCap(body)
        
    }, [webcamRef, onCap]);
    console.log(typeof imgSrc)
    useEffect(() => {
      //console.log(onBlock)
      if(!onBlock){
      const interval = setInterval(() => {
            //console.log("captured");
            capture();
          }, 2000);
          return () => clearInterval(interval);
      }
    }, [capture, onBlock]);
    const replayImage = React.useCallback(() =>{
      if(onImageResult){
        let imageObj = "data:image/webp;base64," + onImageResult;
        return (<div>
                  <img
                    src={imageObj}
                    alt = "Không load được ảnh"
                    width="1300"
                    height = "650"
                  />
              </div>
        )
      }else{
        return(
            <Webcam
              audio={false}
              ref={webcamRef}
              minScreenshotHeight	={650}
              minScreenshotWidth={1500}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
            >
          </Webcam>
        )
      }
    },[onImageResult])
    return (
      <div>
        {replayImage()}
        {/* <Button variant="contained" onClick={capture}
            color = 'secondary' className = {classes.btnCapture}>Check In
        </Button> */}
      </div>
    );
  };

  export default  withStyles(styles)(WebcamCapture);