import Webcam from "react-webcam";
import React , {useEffect} from 'react'
import videoConstraints from './Setting'
import Button from '@material-ui/core/Button';
import callApi from './../../utils/Call_api'
import PropTypes from 'prop-types';
var mask
WebcamCapture.propTypes = {
  onCap: PropTypes.func,
};

WebcamCapture.defaultProps = {
  onCap: null,
};

function WebcamCapture(props) {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const {onCap} = props;
    
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
          height={500}
          width={500}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          mask = {mask}
        />
        <Button variant="contained" onClick={capture} color = 'secondary'>Capture photo</Button>
        {
          imgSrc && (
          <img alt = "System not display your face"
            src={imgSrc}
          />)
        }
      </div>
    );
  };

  export default WebcamCapture;